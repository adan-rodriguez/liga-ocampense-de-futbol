import { teams } from "../data/teams";
import { LogoutBtn } from "./logout-btn";
import { MatchForm } from "./match-form";
import { PlayerForm } from "./player-form";

export default async function Account() {
  return (
    <>
      {/* <h1>Bienvenido {email}</h1> */}
      <MatchForm teams={teams} />
      <PlayerForm teams={teams} />
      <LogoutBtn />
    </>
  );
}
