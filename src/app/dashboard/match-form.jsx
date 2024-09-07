"use client";

import { useState } from "react";
import { GoalsForm } from "./goals-form";
import { zones } from "../data/torneo-placido-lelo-castillo";
import { deleteMatch } from "../lib/matches";
import { useRouter } from "next/navigation";

export function MatchForm({ teams, match }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [zone, setZone] = useState("1"); // esto va solo porque así es el formato del torneo actual
  const [round, setRound] = useState(match?.round ? match.round : "");
  const [home, setHome] = useState(match?.home ? String(match.home) : "");
  const [away, setAway] = useState(match?.away ? String(match.away) : "");
  const [datetime, setDatetime] = useState(
    match?.datetime ? match.datetime : ""
  );
  const [finalized, setFinalized] = useState(Boolean(match?.data_home_goals));
  const [data_home_goals, setDataHomeGoals] = useState(
    match?.data_home_goals ? match.data_home_goals : []
  );
  const [data_away_goals, setDataAwayGoals] = useState(
    match?.data_away_goals ? match.data_away_goals : []
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = {
      home: Number(home),
      away: Number(away),
      datetime: datetime === "" ? undefined : datetime.slice(0, 16),
      data_home_goals: finalized ? data_home_goals : undefined,
      data_away_goals: finalized ? data_away_goals : undefined,
      tournament: 1 /* esto hay que cambiar según el id del torneo en disputa */,
      round,
    };

    try {
      let response;
      if (match) {
        response = await fetch(`/api/matches/${match.match_id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json;charset=UTF-8" }, // por defecto es text/plain;charset=UTF-8
        });
      } else {
        response = await fetch("/api/matches", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json;charset=UTF-8" },
        });
      }

      const { error } = await response.json();

      if (error) {
        setError(error);
      } else {
        if (match) {
          alert("Partido actualizado exitosamente");
        } else {
          alert("Partido creado exitosamente");
          setHome("");
          setAway("");
          setFinalized(false);
          setDataHomeGoals([]);
          setDataAwayGoals([]);
        }
      }
    } catch (error) {
      setError("Ocurrió un error. Regresa más tarde.");
    }

    setLoading(false);
  }

  async function handleDelete() {
    setError("");

    const { error } = await deleteMatch(match.match_id);

    if (error) {
      setError("Ocurrió un error. Intenta de nuevo más tarde...");
      return;
    }

    alert("Partido eliminado");
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{`${match ? "Editar" : "Agregar"}`} partido</h2>

      {!match ? (
        <>
          <label>
            <span>Zona</span>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              name="zone"
            >
              <option value="1">Zona Sur</option>
              <option value="2">Zona Norte</option>
              <option value="cruces">Cruces</option>
            </select>
          </label>

          <label>
            <span>Ronda</span>
            <select
              value={round}
              onChange={(e) => setRound(e.target.value)}
              name="round"
              required
              disabled={Boolean(!zone)}
            >
              <option value="">--Seleccione--</option>
              {zone !== "cruces" ? (
                <>
                  <option value="1">Fecha 1</option>
                  <option value="2">Fecha 2</option>
                  <option value="3">Fecha 3</option>
                  <option value="4">Fecha 4</option>
                  <option value="5">Fecha 5</option>
                  <option value="6">Fecha 6</option>
                  <option value="7">Fecha 7</option>
                  <option value="8">Fecha 8</option>
                  <option value="9">Fecha 9</option>
                  <option value="10">Fecha 10</option>
                  <option value="11">Fecha 11</option>
                  <option value="12">Fecha 12</option>
                  <option value="13">Fecha 13</option>
                  <option value="14">Fecha 14</option>
                  <option value="15">Fecha 15</option>
                  <option value="16">Fecha 16</option>
                  <option value="17">Fecha 17</option>
                  <option value="18">Fecha 18</option>
                </>
              ) : (
                <>
                  <option value="quarter_finals">Cuartos de Final</option>
                  <option value="semifinal">Semifinal</option>
                  <option value="final">Final</option>
                </>
              )}
            </select>
          </label>

          <label>
            <span>Local</span>
            <select
              onChange={(e) => setHome(e.target.value)}
              value={home}
              name="home"
              required
            >
              <option value="">--Seleccione--</option>
              {teams
                .filter((team) =>
                  zones[Number(zone) - 1]
                    ? zones[Number(zone) - 1].includes(team.team_id) &&
                      team.team_id !== Number(away)
                    : true
                )
                .map(({ team_id, short_name }) => (
                  <option value={team_id} key={team_id}>
                    {short_name}
                  </option>
                ))}
            </select>
          </label>

          <label>
            <span>Visitante</span>
            <select
              onChange={(e) => setAway(e.target.value)}
              value={away}
              name="away"
              required
            >
              <option value="">--Seleccione--</option>
              {teams
                .filter((team) =>
                  zones[Number(zone) - 1]
                    ? zones[Number(zone) - 1].includes(team.team_id) &&
                      team.team_id !== Number(home)
                    : true
                )
                .map(({ team_id, short_name }) => (
                  <option value={team_id} key={team_id}>
                    {short_name}
                  </option>
                ))}
            </select>
          </label>
        </>
      ) : (
        <>
          <p>Etapa: {round}</p>
          <p>Local: {teams.find((team) => team.team_id == home).short_name}</p>
          <p>
            Visitante: {teams.find((team) => team.team_id == away).short_name}
          </p>
        </>
      )}

      <label>
        <span>Día y hora</span>
        <input
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          name="datetime"
          type="datetime-local"
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={finalized}
          onChange={() => setFinalized(!finalized)}
        />
      </label>

      {finalized && (
        <>
          <GoalsForm
            label="local"
            team={home}
            goals_data={data_home_goals}
            updateData={(goal_data) => {
              const index = data_home_goals.findIndex(
                (item) => item.goal_id == goal_data.goal_id
              );

              if (index === -1) {
                setDataHomeGoals([...data_home_goals, goal_data]);
              } else {
                const cleanData = [
                  ...data_home_goals.slice(0, index),
                  ...data_home_goals.slice(index + 1),
                ];
                setDataHomeGoals([...cleanData, goal_data]);
              }
            }}
            deleteGoal={(goal_id) => {
              setDataHomeGoals((prevData) => {
                const index = prevData.findIndex(
                  (item) => item.goal_id == goal_id
                );

                const afterGoals = [...prevData.slice(index + 1)].map(
                  (goal) => {
                    return { ...goal, goal_id: goal.goal_id - 1 };
                  }
                );

                return [...prevData.slice(0, index), ...afterGoals];
              });
            }}
            addGoal={() => {
              setDataHomeGoals((prevData) => {
                return [
                  ...prevData,
                  {
                    goal_id: prevData.length + 1,
                    player: undefined,
                    minute: undefined,
                  },
                ];
              });
            }}
          />

          <GoalsForm
            label="visitante"
            team={away}
            goals_data={data_away_goals}
            updateData={(goal_data) => {
              const index = data_away_goals.findIndex(
                (item) => item.goal_id == goal_data.goal_id
              );

              if (index === -1) {
                setDataAwayGoals([...data_away_goals, goal_data]);
              } else {
                const cleanData = [
                  ...data_away_goals.slice(0, index),
                  ...data_away_goals.slice(index + 1),
                ];
                setDataAwayGoals([...cleanData, goal_data]);
              }
            }}
            deleteGoal={(goal_id) => {
              setDataAwayGoals((prevData) => {
                const index = prevData.findIndex(
                  (item) => item.goal_id == goal_id
                );

                const afterGoals = [...prevData.slice(index + 1)].map(
                  (goal) => {
                    return { ...goal, goal_id: goal.goal_id - 1 };
                  }
                );

                return [...prevData.slice(0, index), ...afterGoals];
              });
            }}
            addGoal={() => {
              setDataAwayGoals((prevData) => {
                return [
                  ...prevData,
                  {
                    goal_id: prevData.length + 1,
                    player: undefined,
                    minute: undefined,
                  },
                ];
              });
            }}
          />
        </>
      )}
      {match ? (
        <button type="submit" disabled={loading}>
          {loading ? "Editando partido..." : "Editar partido"}
        </button>
      ) : (
        <button type="submit" disabled={loading}>
          {loading ? "Agregando partido..." : "Agregar partido"}
        </button>
      )}

      {match && (
        <button onClick={handleDelete} type="button">
          Eliminar partido
        </button>
      )}

      {error && <p>{error}</p>}
    </form>
  );
}
