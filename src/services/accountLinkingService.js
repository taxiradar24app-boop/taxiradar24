// src/services/accountLinkingService.js
// ✅ Motor de decisiones para Account Linking Inteligente
// ✅ Phone Index mínimo
// ✅ Separado de userIDService para mantener arquitectura limpia

import { getDb } from "./firebaseConfig";

async function fs() {
  return await import("firebase/firestore");
}

function toMillis(value) {
  if (!value) return 0;
  if (typeof value?.toMillis === "function") return value.toMillis();
  if (typeof value === "number") return value;

  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function hasMeaningfulProgress(progressData = {}) {
  if (!progressData || typeof progressData !== "object") return false;

  const overall = Number(progressData.overall || 0);
  const reglamentoCompleted = Number(progressData?.reglamento?.completed || 0);
  const audioMinutes = Number(progressData?.audio?.minutes || 0);
  const simuladorAttempts = Number(progressData?.simulador?.attempts || 0);
  const simuladorPassed = Number(progressData?.simulador?.passed || 0);
  const callejeroAttempts = Number(progressData?.callejero?.attempts || 0);
  const tarifasCompleted = !!progressData?.tarifas?.completed;

  return (
    overall > 0 ||
    reglamentoCompleted > 0 ||
    audioMinutes > 0 ||
    simuladorAttempts > 0 ||
    simuladorPassed > 0 ||
    callejeroAttempts > 0 ||
    tarifasCompleted
  );
}

function hasActiveSubscription(userData = {}) {
  const status = String(
    userData?.subscriptionStatus ||
      userData?.planStatus ||
      userData?.billingStatus ||
      ""
  ).toLowerCase();

  return ["active", "trialing", "paid", "pro"].includes(status);
}

function getProvidersCount(userData = {}) {
  return Array.isArray(userData?.providers) ? userData.providers.length : 0;
}

function getAccountSignals(userData = {}, progressData = {}) {
  return {
    hasSubscription: hasActiveSubscription(userData),
    hasProgress: hasMeaningfulProgress(progressData),
    phoneVerified: !!userData?.phoneVerified,
    providersCount: getProvidersCount(userData),
    createdAtMs: toMillis(userData?.createdAt),
  };
}

function buildScore(signals) {
  let score = 0;

  if (signals.hasSubscription) score += 100;
  if (signals.hasProgress) score += 50;
  if (signals.phoneVerified) score += 20;
  score += signals.providersCount * 10;

  return score;
}

function decideCanonicalAccount(currentAccount, ownerAccount) {
  const currentScore = buildScore(currentAccount.signals);
  const ownerScore = buildScore(ownerAccount.signals);

  const currentHasStrongValue =
    currentAccount.signals.hasSubscription || currentAccount.signals.hasProgress;
  const ownerHasStrongValue =
    ownerAccount.signals.hasSubscription || ownerAccount.signals.hasProgress;

  if (
    !currentAccount.signals.hasSubscription &&
    ownerAccount.signals.hasSubscription
  ) {
    return {
      status: "link_suggested",
      canonicalUid: ownerAccount.uid,
      reason: "OWNER_HAS_SUBSCRIPTION",
      currentScore,
      ownerScore,
    };
  }

  if (
    currentAccount.signals.hasSubscription &&
    !ownerAccount.signals.hasSubscription
  ) {
    return {
      status: "blocked",
      canonicalUid: currentAccount.uid,
      reason: "CURRENT_HAS_SUBSCRIPTION",
      currentScore,
      ownerScore,
    };
  }

  if (
    currentAccount.signals.hasSubscription &&
    ownerAccount.signals.hasSubscription
  ) {
    return {
      status: "blocked",
      canonicalUid: null,
      reason: "BOTH_HAVE_SUBSCRIPTION",
      currentScore,
      ownerScore,
    };
  }

  if (currentAccount.signals.hasProgress && ownerAccount.signals.hasProgress) {
    return {
      status: "conflict",
      canonicalUid: null,
      reason: "BOTH_HAVE_PROGRESS",
      currentScore,
      ownerScore,
    };
  }

  if (!currentAccount.signals.hasProgress && ownerAccount.signals.hasProgress) {
    return {
      status: "link_suggested",
      canonicalUid: ownerAccount.uid,
      reason: "OWNER_HAS_PROGRESS",
      currentScore,
      ownerScore,
    };
  }

  if (currentAccount.signals.hasProgress && !ownerAccount.signals.hasProgress) {
    return {
      status: "blocked",
      canonicalUid: currentAccount.uid,
      reason: "CURRENT_HAS_PROGRESS",
      currentScore,
      ownerScore,
    };
  }

  if (
    !currentAccount.signals.phoneVerified &&
    ownerAccount.signals.phoneVerified
  ) {
    return {
      status: "link_suggested",
      canonicalUid: ownerAccount.uid,
      reason: "OWNER_PHONE_VERIFIED",
      currentScore,
      ownerScore,
    };
  }

  if (currentScore > ownerScore && currentHasStrongValue && !ownerHasStrongValue) {
    return {
      status: "blocked",
      canonicalUid: currentAccount.uid,
      reason: "CURRENT_HIGHER_VALUE",
      currentScore,
      ownerScore,
    };
  }

  if (ownerScore > currentScore) {
    return {
      status: "link_suggested",
      canonicalUid: ownerAccount.uid,
      reason: "OWNER_HIGHER_SCORE",
      currentScore,
      ownerScore,
    };
  }

  if (
    ownerAccount.signals.createdAtMs > 0 &&
    currentAccount.signals.createdAtMs > 0 &&
    ownerAccount.signals.createdAtMs < currentAccount.signals.createdAtMs
  ) {
    return {
      status: "link_suggested",
      canonicalUid: ownerAccount.uid,
      reason: "OWNER_IS_OLDER",
      currentScore,
      ownerScore,
    };
  }

  if (
    ownerAccount.signals.createdAtMs > 0 &&
    currentAccount.signals.createdAtMs > 0 &&
    currentAccount.signals.createdAtMs < ownerAccount.signals.createdAtMs
  ) {
    return {
      status: "blocked",
      canonicalUid: currentAccount.uid,
      reason: "CURRENT_IS_OLDER",
      currentScore,
      ownerScore,
    };
  }

  return {
    status: "conflict",
    canonicalUid: null,
    reason: "AMBIGUOUS_PHONE_MATCH",
    currentScore,
    ownerScore,
  };
}

function buildDecisionMessage(status) {
  switch (status) {
    case "link_suggested":
      return "Hemos encontrado una cuenta existente asociada a este número. Inicia sesión con tu método anterior para recuperar tu acceso principal.";
    case "blocked":
      return "No hemos podido vincular esta cuenta automáticamente. Por seguridad, inicia sesión con tu cuenta original o contacta soporte.";
    case "conflict":
      return "Hemos detectado dos cuentas con información relevante. Por seguridad, este caso requiere revisión.";
    default:
      return "Este número ya está asociado a otra cuenta. Inicia sesión con la cuenta original o contacta soporte.";
  }
}

export async function claimPhoneForUid(uid, normalizedPhone, meta = {}) {
  if (!uid || !normalizedPhone) {
    return {
      ok: false,
      conflict: false,
      status: "blocked",
      phoneNumber: normalizedPhone,
      message: "Datos incompletos para validar teléfono.",
    };
  }

  const db = await getDb();
  const { doc, runTransaction, serverTimestamp, arrayUnion } = await fs();

  const phoneRef = doc(db, "phoneIndex", normalizedPhone);
  const userRef = doc(db, "users", uid);
  const progressRef = doc(db, "progress", uid);

  return await runTransaction(db, async (transaction) => {
    const phoneSnap = await transaction.get(phoneRef);
    const userSnap = await transaction.get(userRef);
    const progressSnap = await transaction.get(progressRef);

    if (!userSnap.exists()) {
      throw new Error("USER_DOC_NOT_FOUND");
    }

    const currentUserData = userSnap.data() || {};
    const currentProgressData = progressSnap.exists() ? progressSnap.data() : {};

    const providerList = Array.isArray(meta.provider)
      ? meta.provider.filter(Boolean)
      : meta.provider
      ? [meta.provider].filter(Boolean)
      : [];

    const providersPatch =
      providerList.length > 0 ? { providers: arrayUnion(...providerList) } : {};

    if (!phoneSnap.exists()) {
      transaction.set(
        phoneRef,
        {
          uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      transaction.update(userRef, {
        phoneNumber: normalizedPhone,
        canonicalPhone: normalizedPhone,
        canonicalUid: uid,
        phoneVerified: true,
        phoneVerifiedAt: serverTimestamp(),
        needsMerge: false,
        mergeCandidates: [],
        mergeReason: null,
        linkingStatus: "none",
        linkCandidateUid: null,
        identityRiskLevel: "low",
        updatedAt: serverTimestamp(),
        ...providersPatch,
      });

      return {
        ok: true,
        conflict: false,
        status: "ok",
        ownerUid: uid,
        canonicalUid: uid,
        phoneNumber: normalizedPhone,
        message: "Teléfono verificado correctamente.",
      };
    }

    const phoneOwner = phoneSnap.data()?.uid || null;

    if (phoneOwner === uid) {
      transaction.set(
        phoneRef,
        {
          uid,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      transaction.update(userRef, {
        phoneNumber: normalizedPhone,
        canonicalPhone: normalizedPhone,
        canonicalUid: uid,
        phoneVerified: true,
        phoneVerifiedAt: serverTimestamp(),
        needsMerge: false,
        mergeCandidates: [],
        mergeReason: null,
        linkingStatus: "none",
        linkCandidateUid: null,
        identityRiskLevel: "low",
        updatedAt: serverTimestamp(),
        ...providersPatch,
      });

      return {
        ok: true,
        conflict: false,
        status: "ok",
        ownerUid: uid,
        canonicalUid: uid,
        phoneNumber: normalizedPhone,
        message: "Teléfono verificado correctamente.",
      };
    }

    const ownerUserRef = doc(db, "users", phoneOwner);
    const ownerProgressRef = doc(db, "progress", phoneOwner);

    const ownerUserSnap = await transaction.get(ownerUserRef);
    const ownerProgressSnap = await transaction.get(ownerProgressRef);

    const ownerUserData = ownerUserSnap.exists() ? ownerUserSnap.data() : {};
    const ownerProgressData = ownerProgressSnap.exists()
      ? ownerProgressSnap.data()
      : {};

    const currentAccount = {
      uid,
      userData: currentUserData,
      progressData: currentProgressData,
      signals: getAccountSignals(currentUserData, currentProgressData),
    };

    const ownerAccount = {
      uid: phoneOwner,
      userData: ownerUserData,
      progressData: ownerProgressData,
      signals: getAccountSignals(ownerUserData, ownerProgressData),
    };

    const decision = decideCanonicalAccount(currentAccount, ownerAccount);
    const message = buildDecisionMessage(decision.status);

    transaction.update(userRef, {
      phoneNumber: normalizedPhone,
      canonicalPhone: normalizedPhone,
      canonicalUid: decision.canonicalUid || phoneOwner,
      phoneVerified: false,
      needsMerge: true,
      mergeCandidates: [phoneOwner],
      mergeReason: decision.reason,
      mergeDetectedAt: serverTimestamp(),
      linkingStatus: decision.status,
      linkCandidateUid: phoneOwner,
      identityRiskLevel:
        decision.status === "conflict" || decision.status === "blocked"
          ? "high"
          : "medium",
      updatedAt: serverTimestamp(),
      ...providersPatch,
    });

    return {
      ok: false,
      conflict: true,
      status: decision.status,
      ownerUid: phoneOwner,
      currentUid: uid,
      canonicalUid: decision.canonicalUid || phoneOwner,
      phoneNumber: normalizedPhone,
      reason: decision.reason,
      currentScore: decision.currentScore,
      ownerScore: decision.ownerScore,
      message,
      linkSuggested: decision.status === "link_suggested",
      blocked: decision.status === "blocked",
      supportRequired:
        decision.status === "conflict" || decision.status === "blocked",
    };
  });
}