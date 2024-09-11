"use client";

import { useState } from "react";
import { login } from "./login";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    try {
      const { error } = await login(formData);

      setError(error);
    } catch (error) {
      setError("Ocurrió un error. Intenta de nuevo más tarde.");
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ maxWidth: "640px" }}>
        <label>
          <span> Email </span>
          <input type="email" name="email" required />
        </label>

        <label>
          <span> Contraseña </span>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            maxLength={100}
          />
        </label>

        <button disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
