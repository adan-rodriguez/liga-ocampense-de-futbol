import Link from "next/link";
import { LogoutBtn } from "./logout-btn";
import styles from "./styles.module.css";
import { EditIcon, PlusIcon } from "../components/icons";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        {/* <h1>Bienvenido {email}</h1> */}
        <details name="dashboard-menu" className="relative">
          <summary className={styles.summary_btn}>
            <PlusIcon />
          </summary>
          <div className="absolute top-0 left-[125%] flex flex-col w-max p-2 bg-[var(--color-lof)] rounded z-50">
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
        <details name="dashboard-menu" className="relative">
          <summary className={styles.summary_btn}>
            <EditIcon />
          </summary>
          <div className="absolute top-0 left-[125%] flex flex-col w-max p-2 bg-[var(--color-lof)] rounded z-50">
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
      <div className="flex-1">{children}</div>
    </div>
  );
}
