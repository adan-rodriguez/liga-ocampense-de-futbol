import tableStyles from "./table.module.css";
import positionTableStyles from "./position-table.module.css";

export function PositionTable({ matches, teams }) {
  const RESULTS = {
    HOME_WIN: "HOME_WIN",
    AWAY_WIN: "AWAY_WIN",
    DRAW: "DRAW",
  };

  const data = teams.map((team) => ({
    ...team,
    points: 0,
    played: 0,
    w: 0,
    d: 0,
    l: 0,
    gf: 0,
    ga: 0,
  }));

  matches.forEach((match) => {
    const homeGoals = match.data_home_goals?.length;
    const awayGoals = match.data_away_goals?.length;
    if (!homeGoals === null) return;

    const home = data.find((team) => team.team_id === match.home);
    const away = data.find((team) => team.team_id === match.away);

    home.played += 1;
    away.played += 1;

    const result =
      homeGoals > awayGoals
        ? RESULTS.HOME_WIN
        : homeGoals < awayGoals
        ? RESULTS.AWAY_WIN
        : RESULTS.DRAW;

    switch (result) {
      case RESULTS.HOME_WIN:
        home.points += 3;
        home.w += 1;
        away.l += 1;
        break;

      case RESULTS.AWAY_WIN:
        away.points += 3;
        away.w += 1;
        home.l += 1;
        break;

      default:
        home.points += 1;
        away.points += 1;
        away.d += 1;
        home.d += 1;
        break;
    }

    home.gf += homeGoals;
    home.ga += awayGoals;
    away.gf += awayGoals;
    away.ga += homeGoals;
  });

  data.sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points; // Primero ordenar por puntos en orden descendente
    }
    if (a.gf - a.ga !== b.gf - b.ga) {
      return b.gf - b.ga - (a.gf - a.ga); // Luego por diferencia de gol en orden descendente
    }
    return b.gf - a.ga; // Finalmente por goles a favor en orden descendente
  });

  return (
    <div className={tableStyles.container}>
      <table className={`${tableStyles.table}`}>
        <thead className={tableStyles.table_head}>
          <tr className={tableStyles.row}>
            <th className={tableStyles.head_cell}>POS</th>
            <th className={tableStyles.head_cell} style={{ textAlign: "left" }}>
              EQUIPO
            </th>
            <th className={tableStyles.head_cell}>PTS</th>
            <th className={tableStyles.head_cell}>PJ</th>
            <th className={tableStyles.head_cell}>PG</th>
            <th className={tableStyles.head_cell}>PE</th>
            <th className={tableStyles.head_cell}>PP</th>
            <th className={tableStyles.head_cell}>GF</th>
            <th className={tableStyles.head_cell}>GC</th>
            <th className={tableStyles.head_cell}>DIF</th>
          </tr>
        </thead>
        <tbody>
          {data.map((team, index) => (
            <tr
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), linear-gradient(to right, ${
                  team.colors ?? "black, var(--color-lof)"
                })`,
              }}
              className={tableStyles.row}
              key={team.team_id}
            >
              <td className={tableStyles.body_cell}>{index + 1}</td>
              <td
                className={tableStyles.body_cell}
                style={{ textAlign: "left", whiteSpace: "nowrap" }}
              >
                <img
                  src={`escudos/${team.badge || "escudo-vacio.avif"}`}
                  alt={`Escudo de ${team.short_name}`}
                  style={{ height: "16px", display: "inline-block" }}
                />
                <span
                  style={{
                    whiteSpace: "nowrap",
                    marginLeft: "0.5rem",
                    verticalAlign: "middle",
                  }}
                >
                  {team.short_name}
                </span>
              </td>
              <td className={tableStyles.body_cell}>
                <span
                  className={`${positionTableStyles.points} shadow-lg shadow-black`}
                >
                  {team.points}
                </span>
              </td>
              <td className={tableStyles.body_cell}>{team.played}</td>
              <td className={tableStyles.body_cell}>{team.w}</td>
              <td className={tableStyles.body_cell}>{team.d}</td>
              <td className={tableStyles.body_cell}>{team.l}</td>
              <td className={tableStyles.body_cell}>{team.gf}</td>
              <td className={tableStyles.body_cell}>{team.ga}</td>
              <td className={tableStyles.body_cell}>{team.gf - team.ga}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
