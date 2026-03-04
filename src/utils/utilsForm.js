// src/utils/utilsForm.js

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateName = (name) => {
  return name && name.trim().length > 2;
};

// ✅ Ahora valida en formato internacional E.164
export const validatePhone = (phone) => {
  const re = /^\+[1-9]\d{6,14}$/; // formato E.164: + prefijo + número
  return re.test(phone);
};

export const validateLoginForm = (email, password) => {
  if (!validateEmail(email)) {
    return "El correo electrónico no es válido";
  }
  if (!validatePassword(password)) {
    return "La contraseña debe tener al menos 6 caracteres";
  }
  return null;
};

export const validateRegisterForm = (name, email, password, phone) => {
  if (!validateName(name)) {
    return "El nombre debe tener al menos 3 caracteres";
  }
  if (!validateEmail(email)) {
    return "El correo electrónico no es válido";
  }
  if (!validatePassword(password)) {
    return "La contraseña debe tener al menos 6 caracteres";
  }
  if (!validatePhone(phone)) {
    return "El número de teléfono no es válido (usa formato +34...)";
  }
  return null;
};

// 🔹 Traductor de errores de Firebase a mensajes amigables
export const getFriendlyAuthError = (code) => {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "El correo o la contraseña no son correctos.";
    case "auth/user-not-found":
      return "No existe ninguna cuenta con este correo.";
    case "auth/email-already-in-use":
      return "Este correo ya está registrado. Inicia sesión.";
    case "auth/weak-password":
      return "La contraseña es demasiado débil. Usa al menos 6 caracteres.";
    case "auth/invalid-email":
      return "El formato del correo no es válido.";
    default:
      return "Ha ocurrido un error. Inténtalo de nuevo.";
  }
};

// src/utils/utilsForm.js
export const requireLogin = (user, navigate, redirectPath = "/login") => {
  if (!user) {
    // Puedes cambiar alert por tu componente de alerta
    alert("Debes iniciar sesión para acceder a esta sección.");
    navigate(redirectPath);
    return false;
  }
  return true;
};
