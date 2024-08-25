// import { players } from "../data/players";

export async function getPlayers({ team }) {
  // const data = players.filter((player) => player.team == team);
  // return { players: data };
  try {
    const response = await fetch(`/api/players?team=${team}`);
    const { data, error } = await response.json();
    return { players: data, error };
  } catch (error) {
    return { error: "Ocurrió un error. Regresa más tarde." };
  }
}

export async function getPlayer(player_id) {
  // const player = players.find((player) => player.player_id === player_id);
  // return { player };
  try {
    const response = await fetch(`/api/players/${player_id}`);
    const { data, error } = await response.json();
    return { player: data, error };
  } catch (error) {
    return { error: "Ocurrió un error. Regresa más tarde." };
  }
}
