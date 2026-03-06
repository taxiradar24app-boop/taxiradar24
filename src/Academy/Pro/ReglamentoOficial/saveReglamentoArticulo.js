// src/Academy/Pro/ReglamentoOficial/saveReglamentoArticulo.js
// ======================================================================
// 💾 saveReglamentoArticulo.js — PRODUCCIÓN (OPTIMIZADO & RENTABLE)
// ======================================================================

import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { getDb } from "./../../../services/firebaseConfig";

function n(v, fallback = 0) {
  const x = Number(v);
  return Number.isFinite(x) ? x : fallback;
}

function clampNum(v, min = 0, max = 100) {
  const x = Number(v);
  if (!Number.isFinite(x)) return min;
  return Math.max(min, Math.min(max, x));
}

export default async function saveReglamentoArticulo({
  uid,
  articleId,
  articuloMeta = {},
  result = {},
  totalArticles = 0,
}) {
  try {
    const db = await getDb(); // ✅ CORREGIDO

    if (!uid) return { ok: false, error: "Missing uid" };
    if (!articleId) return { ok: false, error: "Missing articleId" };

    const safeTotalArticles = Math.max(1, n(totalArticles, 1));
    const score = clampNum(result?.score ?? 0);
    const passed = !!result?.passed;

    const ref = doc(db, "progress", uid);

    await runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);
      const data = snap.exists() ? snap.data() : {};

      const reglamento =
        data?.reglamento && typeof data.reglamento === "object"
          ? data.reglamento
          : {};

      const prevCompleted = n(reglamento.completed ?? 0);
      const prevAttempts = n(reglamento.attempts ?? 0);
      const prevAvg = n(reglamento.avgScore ?? 0);

      const articles =
        reglamento.articles && typeof reglamento.articles === "object"
          ? reglamento.articles
          : {};

      const prevArticle = articles?.[articleId] || {};
      const prevArticlePassed = prevArticle?.passed === true;

      const completedInc = passed && !prevArticlePassed ? 1 : 0;

      const nextCompleted = prevCompleted + completedInc;
      const nextProgress = Math.round(
        (nextCompleted / safeTotalArticles) * 100
      );

      const nextAttempts = prevAttempts + 1;

      const nextAvg =
        nextAttempts > 0
          ? Math.round((prevAvg * prevAttempts + score) / nextAttempts)
          : 0;

      const prevBest = n(prevArticle?.bestScore ?? 0);
      const nextBest = Math.max(prevBest, score);

      const prevArticleAttempts = n(prevArticle?.attempts ?? 0);
      const nextArticleAttempts = prevArticleAttempts + 1;

      const articlePatch = {
        id: String(articleId),
        rango: articuloMeta?.rango ?? "",
        passed,
        lastScore: score,
        bestScore: nextBest,
        attempts: nextArticleAttempts,
        correct: n(result?.correct ?? 0),
        wrong: n(result?.wrong ?? 0),
        total: n(result?.total ?? 0),
        minToPass: n(result?.minToPass ?? 0),
        lastAttemptAt: serverTimestamp(),
        finishedAt: result?.finishedAt ?? null,
      };

      tx.set(
        ref,
        {
          userId: uid,
          updatedAt: new Date().toISOString(),
          reglamento: {
            total: safeTotalArticles,
            completed: nextCompleted,
            progress: nextProgress,
            attempts: nextAttempts,
            avgScore: nextAvg,
            lastAttemptAt: serverTimestamp(),
            articles: {
              ...articles,
              [articleId]: {
                ...prevArticle,
                ...articlePatch,
              },
            },
          },
        },
        { merge: true }
      );
    });

    return { ok: true };
  } catch (e) {
    console.error("Error saveReglamentoArticulo:", e);
    return { ok: false, error: e?.message || "Unknown error" };
  }
}