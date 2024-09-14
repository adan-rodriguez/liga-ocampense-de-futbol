"use client";

import { useState } from "react";
import { logout } from "./logout";
import styles from "./logout.module.css";
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
    <button onClick={handleLogout} disabled={loading} className={styles.btn}>
      {loading ? <Spinner /> : <LogoutIcon />}
    </button>
  );
}
