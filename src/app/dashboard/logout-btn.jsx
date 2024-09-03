"use client";

import { useState } from "react";
import { logout } from "./logout";
import styles from "./logout.module.css";

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
    <button onClick={handleLogout} disabled={loading} className={styles.btn}>
      {loading ? (
        "Cerrando sesión..."
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
          <path d="M9 12h12l-3 -3" />
          <path d="M18 15l3 -3" />
        </svg>
      )}
    </button>
  );
}
