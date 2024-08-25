import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export function GoalInput({ players, index, updateData, deleteGoal }) {
  const [search, setSearch] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [goal_data, setGoalData] = useState({ player: null, minute: null });
  const [listIsHidden, setListIsHidden] = useState(true);

  const handleClick = (e) => {
    const clickedElement = e.target;

    const item_list = clickedElement.closest("li[data-player-id]");

    if (item_list) {
      const player = Number(item_list.dataset.playerId);

      const new_goal_data = { ...goal_data, player };
      setGoalData(new_goal_data);
      setSearch(item_list.textContent);
    }
  };

  useEffect(() => {
    setTimeout(() => setListIsHidden(!isFocus), 150);
  }, [isFocus]);

  useEffect(() => {
    updateData({ ...goal_data, goal_id: index + 1 });
  }, [goal_data]);

  useEffect(() => {
    return () => {
      deleteGoal(index + 1);
    };
  }, []);

  return (
    <>
      <label style={{ position: "relative" }}>
        <span>{index + 1}º Gol</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          type="search"
          disabled={Boolean(goal_data.player) || goal_data.player === 0}
          required
        />
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
                    {player.firstname + " " + player.lastname}
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
                    {player.firstname + " " + player.lastname}
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
