"use client";

import { useState } from "react";
import { login } from "./login";
import { Spinner } from "../components/spinner";

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

        <button style={{ position: "relative" }} disabled={loading}>
          Ingresar{" "}
          {loading && (
            <div
              style={{
                position: "absolute",
                right: "5px",
                top: "0",
                bottom: "0",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Spinner />
            </div>
          )}
        </button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
