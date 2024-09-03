import Link from "next/link";
import { LogoutBtn } from "./logout-btn";

export default function RootLayout({ children }) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {/* <h1>Bienvenido {email}</h1> */}
        <Link href="/dashboard/partidos/agregar">Agregar partido</Link>
        <Link href="/dashboard/partidos/editar">Editar partido</Link>
        <Link href="/dashboard/jugadores/agregar">Agregar jugador</Link>
        <Link href="/dashboard/jugadores/editar">Editar jugador</Link>
        <div>
          <LogoutBtn />
        </div>
      </div>
      <div style={{ flex: "1" }}>{children}</div>
    </div>
  );
}
