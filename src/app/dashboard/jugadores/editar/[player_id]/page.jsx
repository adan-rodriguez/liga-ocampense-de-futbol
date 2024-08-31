import { PlayerForm } from "@/app/dashboard/player-form";
import { teams } from "@/app/data/teams";
import { getPlayer } from "@/app/lib/players";

export default async function EditPlayerPage({ params }) {
  const { player_id } = params;
  const { player } = await getPlayer(player_id);

  return (
    <div>
      <PlayerForm teams={teams} player={player} />
    </div>
  );
}
