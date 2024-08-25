import Link from "next/link";
import styles from "../styles/header.module.css";

export function Header() {
  return (
    <header>
      <div className={styles.container}>
        <Link href="/">
          <img
            src="/escudos/escudo-lof.avif"
            alt="Escudo de la Liga Ocampense de Fútbol"
            width={100}
            height={100}
          />
        </Link>
        <nav className={styles.nav}>
          <Link href="/equipos">Equipos</Link>
          <Link href="/historia">Historia</Link>
          <details>
            <summary>Torneos</summary>
            <Link href="/torneos/torneo-placido-lelo-castillo">
              Torneo Plácido &apos;Lelo&apos; Castillo
            </Link>
          </details>
          <Link href="/disciplina">Tribunal de disciplina</Link>
        </nav>
      </div>
    </header>
  );
}
