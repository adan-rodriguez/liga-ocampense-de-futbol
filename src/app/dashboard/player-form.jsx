"use client";

import { useState } from "react";

export function PlayerForm({ teams }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const $form = e.target;
    const formData = new FormData($form);
    const jsonRaw = Object.fromEntries(formData.entries());

    const json = {
      ...jsonRaw,
      team: jsonRaw.team === "" ? undefined : Number(jsonRaw.team),
      birthdate: jsonRaw.birthdate === "" ? undefined : jsonRaw.birthdate,
    };

    try {
      const response = await fetch("/api/players", {
        method: "POST",
        body: JSON.stringify(json),
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      });

      const { error } = await response.json();

      if (error) {
        setError(error);
      } else {
        alert("Jugador creado exitosamente");
        $form.reset();
      }
    } catch (error) {
      setError("Ocurrió un error. Regresa más tarde.");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="shadow-inner shadow-black">
      <h2>Agregar jugador</h2>
      <label>
        <span>Nombre/s</span>
        <input name="firstname" required minLength={2} maxLength={200} />
      </label>
      <label>
        <span>Apellido/s</span>
        <input name="lastname" required minLength={2} maxLength={200} />
      </label>
      <label>
        Equipo
        <select name="team">
          <option value="">Libre</option>
          {teams.map(({ team_id, short_name }) => (
            <option value={team_id} key={team_id}>
              {short_name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Fecha de nacimiento</span>
        <input name="birthdate" type="date" />
      </label>
      <button disabled={loading}>
        {loading ? "Agregando jugador..." : "Agregar jugador"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
