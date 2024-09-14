"use client";

import { TrashIcon } from "@/app/components/icons";
import { Spinner } from "@/app/components/spinner";
import { deleteMatch } from "@/app/lib/matches";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteBtn({ match_id }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete(match_id) {
    setLoading(true);
    if (confirm("Estás seguro de eliminar este partido?")) {
      const { error } = await deleteMatch(match_id);

      if (error) {
        alert("Ocurrió un error. Intenta de nuevo más tarde...");
      } else {
        alert("Partido eliminado");
        router.refresh();
      }
    }

    setLoading(false);
  }

  return (
    <button onClick={async () => await handleDelete(match_id)} type="button">
      {loading ? <Spinner /> : <TrashIcon />}
    </button>
  );
}
