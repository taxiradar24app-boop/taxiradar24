// src/Screens/FooterScreens/contacto.js
import React, { useState } from "react";
import { Form } from "../../Footer/FooterStyle";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Aquí podrías integrar EmailJS o Firebase para enviar mensajes
    console.log("Mensaje enviado:", formData);
    setEnviado(true);
  };

  return (
    <Form>
      <h1>Contacto</h1>
      {!enviado ? (
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            required
            value={formData.nombre}
            onChange={handleChange}
          />

          <label>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label>Mensaje:</label>
          <textarea
            name="mensaje"
            rows="5"
            required
            value={formData.mensaje}
            onChange={handleChange}
          />

          <button type="submit">Enviar mensaje</button>
        </form>
      ) : (
        <p>
          ✅ ¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.
        </p>
      )}
    </Form>
  );
}
