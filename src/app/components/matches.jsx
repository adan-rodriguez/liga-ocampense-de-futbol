import { teams } from "../data/teams";
import styles from "../styles/matches.module.css";
import { PlayerName } from "./player-name";

export function Matches({ matches }) {
  return (
    <div className={styles.container}>
      {matches?.map((match) => {
        const dateObj = new Date(match.datetime);
        const formattedDate = dateObj.toLocaleDateString("es-ES", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });
        const formattedTime = dateObj.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const home = teams.find((team) => team.team_id === match.home);
        const away = teams.find((team) => team.team_id === match.away);

        const qty_home_goals = match.data_home_goals?.length;
        const qty_away_goals = match.data_away_goals?.length;

        return (
          <div
            className={`${styles.card} shadow-md shadow-black`}
            key={match.match_id}
          >
            <div>
              <p className={styles.team}>{home.abbr}</p>
            </div>

            <div className={styles.result_container}>
              <span className={styles.result}>
                {qty_home_goals ?? "—"} - {qty_away_goals ?? "—"}
              </span>
            </div>

            <div style={{ textAlign: "right" }}>
              <p className={styles.team}>{away.abbr}</p>
            </div>

            <div className={styles.players}>
              {match.data_home_goals.map((goal) => (
                <p key={goal.goal_id}>
                  {goal.player === 0 ? (
                    "Gol en contra"
                  ) : (
                    <PlayerName player_id={goal.player} />
                  )}
                </p>
              ))}
            </div>

            <div className={styles.datetime}>
              <time style={{ display: "block" }}>
                {
                  (
                    formattedDate.charAt(0).toUpperCase() +
                    formattedDate.slice(1)
                  ).split(",")[0]
                }
                <br />
                {formattedDate.split(",")[1]}
                <br />
                {formattedTime}
              </time>
            </div>

            <div className={styles.players} style={{ textAlign: "right" }}>
              {match.data_away_goals.map(async (goal) => (
                <p key={goal.goal_id}>
                  {goal.player === 0 ? (
                    "Gol en contra"
                  ) : (
                    <PlayerName player_id={goal.player} />
                  )}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
