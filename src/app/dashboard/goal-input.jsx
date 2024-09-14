import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { EditIcon, TrashIcon } from "../components/icons";

export function GoalInput({ players, goal_data, updateData, deleteGoal }) {
  console.log({ players });
  console.log({ goal_data });

  const [search, setSearch] = useState(
    goal_data.player
      ? players.find((player) => player.player_id == goal_data.player)
          .firstname +
          " " +
          players.find((player) => player.player_id == goal_data.player)
            .lastname
      : goal_data.player === 0
      ? "Gol en contra"
      : ""
  );
  const [isFocus, setIsFocus] = useState(false);
  const [listIsHidden, setListIsHidden] = useState(true);

  const handleClick = (e) => {
    const clickedElement = e.target;

    const item_list = clickedElement.closest("li[data-player-id]");

    if (item_list) {
      const player = Number(item_list.dataset.playerId);

      const new_goal = { ...goal_data, player };
      updateData(new_goal);
      setSearch(item_list.textContent);
    }
  };

  useEffect(() => {
    setTimeout(() => setListIsHidden(!isFocus), 150);
  }, [isFocus]);

  useEffect(() => {
    setSearch(() => {
      if (goal_data.player) {
        const { firstname, lastname } = players.find(
          (player) => player.player_id == goal_data.player
        );
        return firstname + " " + lastname;
      }

      if (goal_data.player === 0) {
        return "Gol en contra";
      }

      return "";
    });
  }, [goal_data]);

  return (
    <>
      <label style={{ position: "relative" }}>
        <span>{goal_data.goal_id}º Gol</span>
        <div style={{ display: "flex", gap: "0.25rem" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            type="search"
            disabled={Boolean(goal_data.player) || goal_data.player === 0}
            required
          />
          {(Boolean(goal_data.player) || goal_data.player === 0) && (
            <button
              onClick={() => {
                updateData({
                  ...goal_data,
                  player: null,
                  minute: null,
                });
                setSearch("");
              }}
              type="button"
              className={styles.goal_btn}
            >
              <EditIcon />
            </button>
          )}
          <button
            onClick={() => deleteGoal(goal_data.goal_id)}
            type="button"
            className={styles.goal_btn}
          >
            <TrashIcon />
          </button>
        </div>
        {!listIsHidden && (
          <ul onClick={handleClick} className={styles.players_list}>
            {search ? (
              players
                .filter((player) =>
                  (player.firstname + " " + player.lastname)
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase())
                )
                .map((player) => (
                  <li
                    data-player-id={player.player_id}
                    key={player.player_id}
                    className={styles.item_players_list}
                  >
                    <span className={styles.lastname}>{player.lastname}</span>{" "}
                    {player.firstname}
                  </li>
                ))
            ) : (
              <>
                <li data-player-id="0" className={styles.item_players_list}>
                  Gol en contra
                </li>
                {players.map((player) => (
                  <li
                    data-player-id={player.player_id}
                    key={player.player_id}
                    className={styles.item_players_list}
                  >
                    <span className={styles.lastname}>{player.lastname}</span>{" "}
                    {player.firstname}
                  </li>
                ))}
              </>
            )}
          </ul>
        )}
      </label>
    </>
  );
}
