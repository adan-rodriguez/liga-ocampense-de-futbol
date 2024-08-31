"use client";

import { deleteMatch } from "@/app/lib/matches";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteBtn({ match_id }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete(match_id) {
    setLoading(true);
    const { error } = await deleteMatch(match_id);

    if (error) {
      alert("Ocurrió un error. Intenta de nuevo más tarde...");
    } else {
      alert("Partido eliminado");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <button onClick={async () => await handleDelete(match_id)} type="button">
      {loading ? "Eliminando..." : "Eliminar"}
    </button>
  );
}
