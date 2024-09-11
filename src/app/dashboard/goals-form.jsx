"use client";

import { useEffect, useState } from "react";
import { GoalInput } from "./goal-input";
import { getPlayers } from "../lib/players";
import { teams } from "../data/teams";
import styles from "./styles.module.css";

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
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
          )}
        </button>
      </div>

      {goals_data
        .sort((a, b) => a.goal_id - b.goal_id)
        .map((goal_data) => (
          <GoalInput
            key={goal_data.goal_id}
            players={playersList.sort(
              (a, b) => a.lastname.toLowerCase() - b.lastname.toLowerCase()
            )}
            goal_data={goal_data}
            updateData={updateData}
            deleteGoal={deleteGoal}
          />
        ))}
    </>
  );
}
