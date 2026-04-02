const handleCancel = async () => {
  await fetch("/stripe/cancel-subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subscriptionId: user.subscriptionId,
    }),
  });

  alert("Tu suscripción se cancelará al final del periodo.");
};