import { Matches } from "../components/matches";
import { rounds_reference } from "../data/rounds-reference";
import { rounds, zones } from "../data/torneo-placido-lelo-castillo";
import { getMatches } from "../lib/matches";

export async function TorneoPlacidoLeloCastillo() {
  const { matches, error } = await getMatches();

  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Torneo Plácido &apos;Lelo&apos; Castillo</h2>
      <Zone
        name="Zona 1"
        matches={matches.filter((match) => zones[0].includes(match.home))}
      />
      <Zone
        name="Zona 2"
        matches={matches.filter((match) => zones[1].includes(match.home))}
      />
    </section>
  );
}

function Zone({ name, matches }) {
  if (matches.length === 0) {
    return (
      <section>
        <h3>{name}</h3>
        <p>No hay partidos para mostrar</p>
      </section>
    );
  }

  let isFirstDetailsOpen = false;

  return (
    <section>
      <h3>{name}</h3>
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
          <details key={round} open={shouldOpen}>
            <summary>{rounds_reference[round]}</summary>
            <Matches matches={filteredMatches} />
          </details>
        );
      })}
    </section>
  );
}
