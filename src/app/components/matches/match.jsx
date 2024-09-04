import { teams } from "@/app/data/teams";
import styles from "./matches.module.css";
import { PlayerName } from "./player-name";

export function Match({ match }) {
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
    <article
      className={`${styles.card} shadow-inner shadow-black`}
      key={match.match_id}
    >
      <div className={styles.datetime}>
        <time>
          {formattedDate} {formattedTime}
        </time>
      </div>
      <div
        className={styles.team}
        style={{
          backgroundImage: `linear-gradient(to right, ${
            home.colors ?? "var(--color-lof)"
          }, black), linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img
              src={`/escudos/${home.badge || "/escudo-vacio.avif"}`}
              alt={`Escudo de ${home.short_name}`}
              className={styles.badge}
            />
            <p className={styles.team_name}>{home.short_name}</p>
            <p className={styles.team_abbr}>{home.abbr}</p>
          </div>
          <span
            className={`${styles.result} shadow-lg shadow-black`}
            style={{ marginLeft: "auto" }}
          >
            {qty_home_goals}
          </span>
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
      </div>

      <div
        className={styles.team}
        style={{
          backgroundImage: `linear-gradient(to right, black, ${
            away.colors ?? "var(--color-lof)"
          }), linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className={`${styles.result} shadow-lg shadow-black`}>
            {qty_away_goals}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginLeft: "auto",
            }}
          >
            <img
              src={`/escudos/${away.badge || "/escudo-vacio.avif"}`}
              alt={`Escudo de ${away.short_name}`}
              className={styles.badge}
            />
            <p className={styles.team_name}>{away.short_name}</p>
            <p className={styles.team_abbr}>{away.abbr}</p>
          </div>
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

      {/* <div className={styles.datetime}>
        <time style={{ display: "block" }}>
          {
            (
              formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
            ).split(",")[0]
          }
          <br />
          {formattedDate.split(",")[1]}
          <br />
          {formattedTime}
        </time>
      </div> */}

      {/* <div className={styles.datetime}>
        <time>
          {formattedDate} {formattedTime}
        </time>
      </div> */}
    </article>
  );
}
