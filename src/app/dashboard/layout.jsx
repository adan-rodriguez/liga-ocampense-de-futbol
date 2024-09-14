import Link from "next/link";
import { LogoutBtn } from "./logout-btn";
import styles from "./styles.module.css";
import { EditIcon, PlusIcon } from "../components/icons";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {/* <h1>Bienvenido {email}</h1> */}
        <details name="dashboard-menu" style={{ position: "relative" }}>
          <summary className={styles.summary_btn}>
            <PlusIcon />
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
            <EditIcon />
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
