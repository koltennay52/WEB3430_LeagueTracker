import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export function Home(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [summonerName, setSummonerName] = useState();
  const [summonerDetails, setSummonerDetails] = useState();

  //retrieve summoner name
  useEffect(() => {
    if (!summonerName) {
      fetch("/api/v1/users/getSummonerName", {
        credentials: "same-origin",
      })
        .then((response) => response.text())
        .then((data) => {
          const retrieved_summonerName = JSON.parse(data);
          setSummonerName(retrieved_summonerName);
          //console.log(retrieved_summonerName);
        });
    }
  });
  // retrieve additional summonerdetails
  useEffect(() => {
    if (summonerName) {
      if (!summonerDetails) {
        fetch(`/api/riot/summonerDetails/${summonerName}`, {
          credentials: "same-origin",
        })
          .then((response) => response.text())
          .then((data) => {
            const retrieved_summonerDetails = JSON.parse(data);
            setSummonerDetails(retrieved_summonerDetails);
            console.log(retrieved_summonerDetails);
          });
      }
    }
  });

  if (!summonerName || !summonerDetails) {
    return <span className="text-center">Loading data...</span>;
  } else {
    return (
      <>
        <div className="jumbotron jumbotron-fluid home-hero">
          <div className="container text-center">
            <h1 className="display-4">Welcome, {summonerName}!</h1>
            <img style={{width: "25%"}} src={require('../../images/rankemblems/Emblem_Silver.png')}></img>
          </div>
        </div>
      </>
    );
  }
}
