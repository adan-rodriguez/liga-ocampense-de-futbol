import { getPlayer } from "@/app/lib/players";
import tableStyles from "./table.module.css";
import scorersTableStyles from "./scorers-table.module.css";
import { teams } from "@/app/data/teams";

export async function ScorersTable({ matches }) {
  const goalCount = {};

  matches.forEach((match) => {
    // Contabilizar goles de los jugadores en el equipo local
    match.data_home_goals.forEach((goal) => {
      if (!goalCount[goal.player]) {
        goalCount[goal.player] = 0;
      }
      goalCount[goal.player] += 1;
    });

    // Contabilizar goles de los jugadores en el equipo visitante
    match.data_away_goals.forEach((goal) => {
      if (!goalCount[goal.player]) {
        goalCount[goal.player] = 0;
      }
      goalCount[goal.player] += 1;
    });
  });

  const scorers = [];

  for (const player_id in goalCount) {
    if (player_id === "0" || player_id === "undefined") continue;
    const { player, error } = await getPlayer(player_id);
    if (error) continue;

    scorers.push({
      ...player, // Información del jugador obtenida desde la base de datos
      goals: goalCount[player_id], // Número de goles contabilizados
    });
  }

  scorers.sort((a, b) => b.goals - a.goals);

  return (
    <div className={tableStyles.container}>
      <table className={`${tableStyles.table}`} style={{ maxWidth: "500px" }}>
        <caption>Goleadores</caption>
        <thead className={tableStyles.table_head}>
          <tr className={tableStyles.row}>
            <th className={tableStyles.head_cell} style={{ textAlign: "left" }}>
              JUGADOR
            </th>
            <th className={tableStyles.head_cell}>GOLES</th>
          </tr>
        </thead>
        <tbody>
          {scorers.slice(0, 10).map((player) => {
            const team = teams.find((team) => team.team_id === player.team);

            return (
              <tr
                style={{
                  backgroundImage: `linear-gradient(black, rgba(0, 0, 0, 0.5)), linear-gradient(to right,  ${
                    team?.colors ?? "var(--color-lof)"
                  })`,
                }}
                className={tableStyles.row}
                key={player.player_id}
              >
                <td
                  style={{ textAlign: "left", whiteSpace: "nowrap" }}
                  className={tableStyles.body_cell}
                >
                  <img
                    style={{
                      height: "24px",
                      display: "inline-block",
                      marginRight: "0.5rem",
                      verticalAlign: "sub",
                    }}
                    src={`silueta.png`}
                    alt={player.firstname + " " + player.lastname}
                  />
                  <span
                    style={{
                      whiteSpace: "nowrap",
                      marginRight: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {player.firstname} {player.lastname}
                  </span>
                  <span style={{ fontSize: "0.75rem", opacity: "0.9" }}>
                    ({team?.abbr})
                  </span>
                </td>
                <td className={tableStyles.body_cell}>
                  <span
                    className={`${scorersTableStyles.goals} shadow-lg shadow-black`}
                  >
                    {player.goals}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
