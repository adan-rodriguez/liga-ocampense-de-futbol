"use client";

import { useEffect, useState } from "react";
import { GoalInput } from "./goal-input";
import { getPlayers } from "../lib/players";

export function GoalsForm({
  label,
  team,
  goals_data,
  addGoal,
  updateData,
  deleteGoal,
}) {
  const [playersList, setPlayersList] = useState([]);
  const [loading, setLoading] = useState(true);
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

  console.log({ goals_data });

  return (
    <>
      {error && <p>{error}</p>}

      {loading ? (
        <p>Cargando jugadores...</p>
      ) : (
        <>
          <button onClick={addGoal} type="button">
            Agregar gol
          </button>
          {goals_data
            .sort((a, b) => a.goal_id - b.goal_id)
            .map((goal_data) => (
              <GoalInput
                key={goal_data.goal_id}
                players={playersList}
                goal_data={goal_data}
                updateData={updateData}
                deleteGoal={deleteGoal}
              />
            ))}
        </>
      )}

      {/* {Number(goals) > 0 &&
        Array.from({ length: Number(goals) }).map((_, index) => (
          <GoalInput
            key={index}
            players={playersList}
            index={index}
            updateData={updateData}
            deleteGoal={deleteGoal}
          />
        ))} */}
    </>
  );
}
