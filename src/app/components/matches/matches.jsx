import styles from "./matches.module.css";
import { Match } from "./match";

export function Matches({ matches }) {
  return (
    <div className={styles.container}>
      {matches?.map((match) => (
        <Match key={match.match_id} match={match} />
      ))}
    </div>
  );
}
