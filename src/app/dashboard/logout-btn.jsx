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
      {loading ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  );
}
