import React, { useEffect, useState } from "react";
export function HomeChampMasteryList(props) {
  const [championDetails, setChampionDetails] = useState();
  const cm = props.champMastery;

  useEffect(() => {
    if (cm) {
      if (!championDetails) {
        fetch(`/api/champions/${cm.championId}`, {
          credentials: "same-origin",
        })
          .then((response) => response.text())
          .then((data) => {
            const retrieved_championDetails = JSON.parse(data);
            setChampionDetails(retrieved_championDetails);
            //console.log(retrieved_championDetails);
          });
      }
    }
  });

  if (!cm || !championDetails) {
    return <tr><td>Loading...</td></tr>;
  } else {
    return (
      <>
        <tr>
          <td>{championDetails.name}</td>
          <td>{cm.championPoints}</td>
          <td>{cm.championLevel}</td>
        </tr>
      </>
    );
  }
}
