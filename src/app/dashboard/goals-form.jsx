"use client";

import { useEffect, useState } from "react";
import { GoalInput } from "./goal-input";
import { getPlayers } from "../lib/players";

export function GoalsForm({ label, team, updateData, deleteGoal }) {
  const [goals, setGoals] = useState("0");
  const [playersList, setPlayersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function obtainPlayers() {
      setError("");

      if (!team || playersList[0]?.team == team) return;

      setLoading(true);

      const { players, error } = await getPlayers({ team });

      if (error) return setError(error);

      setPlayersList(players);
      setLoading(false);
    }

    obtainPlayers();
  }, [team]);

  return (
    <>
      <label>
        <span>Goles del {label}</span>
        <input
          onChange={(e) => {
            const goals = e.target.value;
            setGoals(goals);
            // resetData(goals);
          }}
          value={goals}
          name="home_goals"
          type="number"
          min={0}
          max={99}
          required
        />
      </label>
      {loading && <p>Cargando jugadores...</p>}
      {error && <p>{error}</p>}
      {Number(goals) > 0 &&
        !loading &&
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
