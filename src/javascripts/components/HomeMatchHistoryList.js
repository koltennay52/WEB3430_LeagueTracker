import React, { useEffect, useState } from "react";
export function HomeMatchHistoryList(props) {
 const [matchResult, setMatchResults] = useState();
 const m = props.match;

 useEffect(() => {
    if (m) {
      if (!matchResult) {
        fetch(`/api/matches/result/${m.gameId}/${m.champion}`, {
          credentials: "same-origin",
        })
          .then((response) => response.text())
          .then((data) => {
            const retrieved_matchResult = JSON.parse(data);
            setMatchResults(retrieved_matchResult);
            //console.log(retrieved_matchResult);
          });
      }
    }
  });

  if (!m || !matchResult) {
    return <tr><td>Loading...</td></tr>;
  } else {
      var winLoss;
      if (matchResult.win){
        winLoss = "Win"
      } else {
          winLoss = "Loss"
      }

    return (
      <>
        <tr>
          <td>{m.role}</td>
          <td>{winLoss}</td>
          <td>{matchResult.date}</td>
        </tr>
      </>
    );
  }

}