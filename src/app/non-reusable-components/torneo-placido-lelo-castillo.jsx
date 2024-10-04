import { Matches } from "../components/matches/matches";
import { PositionTable } from "../components/tables/position-table";
import { ScorersTable } from "../components/tables/scorers-table";
import { rounds_reference } from "../data/rounds-reference";
import { teams } from "../data/teams";
import { rounds, zones } from "../data/torneo-placido-lelo-castillo";
import { getMatches } from "../lib/matches";
import styles from "./styles.module.css";

export async function TorneoPlacidoLeloCastillo() {
  const { matches, error } = await getMatches();

  if (error) return <p>{error}</p>;

  const sortedMatches = matches.sort(
    (a, b) => new Date(b.datetime) - new Date(a.datetime)
  );

  const finalPhaseMatches = sortedMatches.filter((match) =>
    ["final", "semifinal", "quarter_final", "round_of_16"].includes(match.round)
  );

  const zoneMatches = sortedMatches.filter((match) =>
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
    ].includes(match.round)
  );

  const southMatches = zoneMatches.filter((match) =>
    zones[0].includes(match.home)
  );
  const northMatches = zoneMatches.filter((match) =>
    zones[1].includes(match.home)
  );

  return (
    <section>
      <h2 className="font-black text-2xl">
        Torneo Plácido &apos;Lelo&apos; Castillo
      </h2>
      {/* <section className="mt-4">
        <h3>Fase final</h3>
        <img src="llave.png" alt="" />
      </section> */}
      <section>
        <section className="my-8">
          <Zone name="Fase Final" matches={finalPhaseMatches} />
        </section>
        <section className="my-8">
          <Zone name="Zona Sur" matches={southMatches} />
          <div className="my-8">
            <PositionTable
              matches={southMatches}
              teams={teams.filter((team) => zones[0].includes(team.team_id))}
            />
          </div>
        </section>
        <section className="my-8">
          <Zone name="Zona Norte" matches={northMatches} />
          <div className="my-8">
            <PositionTable
              matches={northMatches}
              teams={teams.filter((team) => zones[1].includes(team.team_id))}
            />
          </div>
        </section>
      </section>
      <section className="my-8">
        <ScorersTable matches={zoneMatches} />
      </section>
    </section>
  );
}

function Zone({ name, matches }) {
  if (matches.length === 0) {
    return (
      <section>
        <h3 className="flex items-center gap-2">
          <hr aria-hidden="true" className="flex-1 border-[var(--color-lof)]" />
          <span className="font-bold text-xs">{name}</span>
          <hr aria-hidden="true" className="flex-1 border-[var(--color-lof)]" />
        </h3>
        <p>No hay partidos para mostrar</p>
      </section>
    );
  }

  let isFirstDetailsOpen = false;

  return (
    <section>
      <h3 className="flex items-center gap-2">
        <hr aria-hidden="true" className="flex-1 border-[var(--color-lof)]" />
        <span className="font-bold text-xs">{name}</span>
        <hr aria-hidden="true" className="flex-1 border-[var(--color-lof)]" />
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginTop: "2rem",
        }}
      >
        {rounds.map((round) => {
          const filteredMatches = matches.filter(
            (match) => match.round === round
          );

          if (filteredMatches.length === 0) {
            return null;
          }

          const shouldOpen = !isFirstDetailsOpen;
          isFirstDetailsOpen = true;

          return (
            <details
              name={name}
              key={round}
              open={shouldOpen}
              className={styles.details}
            >
              <summary
                className={styles.summary}
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {rounds_reference[round]}
              </summary>
              <Matches matches={filteredMatches} />
            </details>
          );
        })}
      </div>
    </section>
  );
}
