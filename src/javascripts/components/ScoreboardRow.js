import React from "react";

export function ScoreboardRow(props) {
  const p = props.participant;

  return (
    <>
      <tr>
        <td>{p.teamId}</td>
        <td>{p.stats.kills}/{p.stats.deaths}/{p.stats.assists}</td>
        <td>{p.stats.totalDamageDealt}</td>
      </tr>
    </>
  );
}
