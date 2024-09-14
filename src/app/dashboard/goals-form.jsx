"use client";

import { useEffect, useState } from "react";
import { GoalInput } from "./goal-input";
import { getPlayers } from "../lib/players";
import { teams } from "../data/teams";
import styles from "./styles.module.css";
import { Spinner } from "../components/spinner";
import { PlusIcon } from "../components/icons";

export function GoalsForm({
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

  return (
    <>
      {error && <p>{error}</p>}

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <p>Goles de {teams.find((t) => t.team_id == team)?.short_name}</p>

        <button
          disabled={loading}
          onClick={addGoal}
          type="button"
          className={`${styles.goal_btn} ${styles.add_goal_btn}`}
        >
          {loading ? <Spinner /> : <PlusIcon width={16} height={16} />}
        </button>
      </div>

      {!loading &&
        goals_data
          .sort((a, b) => a.goal_id - b.goal_id)
          .map((goal_data) => (
            <GoalInput
              key={goal_data.goal_id}
              players={playersList.sort((a, b) =>
                a.lastname.toLowerCase().localeCompare(b.lastname.toLowerCase())
              )}
              goal_data={goal_data}
              updateData={updateData}
              deleteGoal={deleteGoal}
            />
          ))}
    </>
  );
}
