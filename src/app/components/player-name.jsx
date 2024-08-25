"use client";

import { useEffect, useState } from "react";
import { getPlayer } from "../lib/players";

const Loader = () => <span>Cargando...</span>;

export function PlayerName({ player_id }) {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      const { player, error } = await getPlayer(player_id);
      if (error) {
        setPlayer("Error");
      } else {
        setPlayer(player);
      }
      setLoading(false);
    };

    fetchPlayer();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <span>
      {player ? `${player.firstname} ${player.lastname}` : "Desconocido"}
    </span>
  );
}
