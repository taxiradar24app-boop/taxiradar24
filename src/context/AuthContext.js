const refreshSubscription = useCallback(
  async (userParam) => {
    const currentUser = userParam || user;

    if (!currentUser) {
      setSubscription(null);
      setSubscriptionLoading(false);
      return;
    }

    setSubscriptionLoading(true);

    try {
      let token = tokenCacheRef.current;

      // 🔥 REFRESCAR TOKEN SOLO CADA 60s
      if (!token || Date.now() - tokenTimeRef.current > 60000) {
        try {
          token = await currentUser.getIdToken();
          tokenCacheRef.current = token;
          tokenTimeRef.current = Date.now();
        } catch (err) {
          console.warn("⚠️ Firebase token falló:", err?.message);
        }
      }

      const sub = await fetchMySubscription(currentUser, token);
      setSubscription(sub);

    } catch (error) {
      console.error("❌ Error cargando suscripción:", error);

      setSubscription(
        (prev) => prev || { status: "none", active: false, plan: null }
      );
    } finally {
      setSubscriptionLoading(false);
    }
  },
  [user]
);