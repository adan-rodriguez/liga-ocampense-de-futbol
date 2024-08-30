import Link from "next/link";

export default async function DashboardPage() {
  return (
    <div>
      {/* <h1>Bienvenido {email}</h1> */}
      <Link href="/dashboard/partidos/agregar">Agregar partido</Link>
      <Link href="/dashboard/partidos/editar">Editar partido</Link>
      <Link href="/dashboard/jugadores/agregar">Agregar jugador</Link>
      <Link href="/dashboard/jugadores/editar">Editar jugador</Link>
    </div>
  );
}
