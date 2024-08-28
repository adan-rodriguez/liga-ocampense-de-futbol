"use client";

import { useEffect, useState } from "react";
import { GoalInput } from "./goal-input";
import { getPlayers } from "../lib/players";

export function GoalsForm({ label, team, updateData, deleteGoal }) {
  const [goals, setGoals] = useState("0");
  const [playersList, setPlayersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function obtainPlayers() {
    setError("");
    setLoading(true);

    const { players, error } = await getPlayers({ team });

    if (error) {
      setError(error);
    } else {
      setPlayersList(players);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (!team || playersList[0]?.team == team) return;
    obtainPlayers();
  }, [team]);

  return (
    <>
      <label>
        <span>Goles del {label}</span>
        <input
          onChange={(e) => setGoals(e.target.value)}
          value={goals}
          name="home_goals"
          type="number"
          min={0}
          max={99}
          required
        />
      </label>
      <button type="button" onClick={obtainPlayers} disabled={loading}>
        {loading ? "Cargando jugadores..." : "Actualizar lista de jugadores"}
      </button>
      {error && <p>{error}</p>}
      {Number(goals) > 0 &&
        Array.from({ length: Number(goals) }).map((_, index) => (
          <GoalInput
            key={index}
            players={playersList}
            index={index}
            updateData={updateData}
            deleteGoal={deleteGoal}
          />
        ))}
    </>
  );
}
