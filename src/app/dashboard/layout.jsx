import Link from "next/link";
import { LogoutBtn } from "./logout-btn";
import styles from "./styles.module.css";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {/* <h1>Bienvenido {email}</h1> */}
        <details name="dashboard-menu" style={{ position: "relative" }}>
          <summary className={styles.summary_btn}>
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
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
          </summary>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "125%",
              display: "flex",
              flexDirection: "column",
              width: "max-content",
              padding: "0.5rem",
              backgroundColor: "var(--color-lof)",
              borderRadius: "4px",
              zIndex: "999",
            }}
          >
            <Link
              href="/dashboard/partidos/agregar"
              className={styles.menu_link}
            >
              Agregar partido
            </Link>
            <Link
              href="/dashboard/jugadores/agregar"
              className={styles.menu_link}
            >
              Agregar jugador
            </Link>
          </div>
        </details>
        <details name="dashboard-menu" style={{ position: "relative" }}>
          <summary className={styles.summary_btn}>
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
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
          </summary>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "125%",
              display: "flex",
              flexDirection: "column",
              width: "max-content",
              padding: "0.5rem",
              backgroundColor: "var(--color-lof)",
              borderRadius: "4px",
              zIndex: "999",
            }}
          >
            <Link
              href="/dashboard/partidos/editar"
              className={styles.menu_link}
            >
              Editar partido
            </Link>
            <Link
              href="/dashboard/jugadores/editar"
              className={styles.menu_link}
            >
              Editar jugador
            </Link>
          </div>
        </details>
        <div>
          <LogoutBtn />
        </div>
      </div>
      <div style={{ flex: "1" }}>{children}</div>
    </div>
  );
}
