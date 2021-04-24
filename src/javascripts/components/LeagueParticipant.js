import React from "react";

export function LeagueParticipant(props) {
  const p = props.participant;

  return (
    <>
      <tr>
        <td>{p.summonerName}</td>
        <td>{p.wins}</td>
        <td>{p.losses}</td>
        <td>{p.leaguePoints}</td>
      </tr>
    </>
  );
}
