"use client";

import { useState } from "react";

export function PlayerForm({ teams, player }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [firstname, setFirstname] = useState(player?.firstname ?? "");
  const [lastname, setLastname] = useState(player?.lastname ?? "");
  const [team, setTeam] = useState(player?.team ? String(player.team) : "");
  const [birthdate, setBirthdate] = useState(player?.birthdate ?? "");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const playerData = {
      firstname,
      lastname,
      team: team === "" ? undefined : Number(team),
      birthdate: birthdate === "" ? undefined : birthdate,
    };

    try {
      let response;
      if (player) {
        response = await fetch(`/api/players/${player.player_id}`, {
          method: "PUT",
          body: JSON.stringify(playerData),
          headers: { "Content-Type": "application/json;charset=UTF-8" },
        });
      } else {
        response = await fetch("/api/players", {
          method: "POST",
          body: JSON.stringify(playerData),
          headers: { "Content-Type": "application/json;charset=UTF-8" },
        });
      }

      const { error } = await response.json();

      if (error) {
        setError(error);
      } else {
        if (player) {
          alert("Jugador editado exitosamente");
        } else {
          alert("Jugador creado exitosamente");
          setFirstname("");
          setLastname("");
          setTeam("");
          setBirthdate("");
        }
      }
    } catch (error) {
      setError("Ocurrió un error. Regresa más tarde.");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar jugador</h2>
      <label>
        <span>Nombre/s</span>
        <input
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          name="firstname"
          required
          minLength={2}
          maxLength={200}
        />
      </label>
      <label>
        <span>Apellido/s</span>
        <input
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          name="lastname"
          required
          minLength={2}
          maxLength={200}
        />
      </label>
      <label>
        Equipo
        <select
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          name="team"
        >
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
        <input
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          name="birthdate"
          type="date"
        />
      </label>

      {player ? (
        <button type="submit" disabled={loading}>
          {loading ? "Editando jugador..." : "Editar jugador"}
        </button>
      ) : (
        <button type="submit" disabled={loading}>
          {loading ? "Agregando jugador..." : "Agregar jugador"}
        </button>
      )}

      {error && <p>{error}</p>}
    </form>
  );
}
