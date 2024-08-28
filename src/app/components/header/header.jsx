import Link from "next/link";
import styles from "./header.module.css";
import { Playfair_Display } from "next/font/google";

const playfair_display = Playfair_Display({ subsets: ["latin"] });

export function Header() {
  return (
    <header>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.logo_cont}>
            <img
              src="/escudos/escudo-lof.avif"
              alt="Escudo de la Liga Ocampense de Fútbol"
              className={styles.logo}
            />
            <h1 className={`${styles.logo_text} ${playfair_display.className}`}>
              Liga Ocampense <br aria-hidden="true" /> de Fútbol
            </h1>
          </div>
        </Link>
        <nav className={styles.nav}>
          <Link href="/equipos">Equipos</Link>
          {/* <Link href="/historia">Historia</Link>
          <details>
            <summary>Torneos</summary>
            <Link href="/torneos/torneo-placido-lelo-castillo">
              Torneo Plácido &apos;Lelo&apos; Castillo
            </Link>
          </details>
          <Link href="/disciplina">Tribunal de disciplina</Link> */}
        </nav>
      </div>
    </header>
  );
}
