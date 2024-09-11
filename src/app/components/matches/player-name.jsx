import { getPlayer } from "@/app/lib/players";
import { Suspense } from "react";

export async function FetchingPlayerName({ player_id }) {
  const { player, error } = await getPlayer(player_id);

  return (
    <span>
      {error ? "Desconocido" : <>{player.firstname + " " + player.lastname}</>}
    </span>
  );
}

export function PlayerName({ player_id }) {
  return (
    <Suspense fallback={<span>Cargando...</span>}>
      <FetchingPlayerName player_id={player_id} />
    </Suspense>
  );
}
