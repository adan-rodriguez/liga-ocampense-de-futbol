"use client";

import { useState } from "react";
import { logout } from "./logout";
import { Spinner } from "../components/spinner";
import { LogoutIcon } from "../components/icons";

export function LogoutBtn() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logout();
    } catch (error) {
      alert("Ocurrió un error. Intenta de nuevo más tarde.");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="p-2 w-full aspect-square grid place-items-center"
    >
      {loading ? <Spinner size={24} /> : <LogoutIcon />}
    </button>
  );
}
