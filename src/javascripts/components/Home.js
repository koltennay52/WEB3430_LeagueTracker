import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { LoadingSpinner} from './LoadingSpinner'

export function Home(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [summonerName, setSummonerName] = useState();
  const [summonerDetails, setSummonerDetails] = useState();
  const [soloRank, setSoloRank] = useState();

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
        fetch(`/api/summoner/summonerDetails/${summonerName}`, {
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
  // retrieve additional summonerdetails
  useEffect(() => {
    if (summonerDetails) {
      if (!soloRank) {
        fetch(`/api/summoner/soloRank/${summonerDetails.id}`, {
          credentials: "same-origin",
        })
          .then((response) => response.text())
          .then((data) => {
            const retrieved_soloRank = JSON.parse(data);
            setSoloRank(retrieved_soloRank);
            //console.log(retrieved_soloRank);
          });
      }
    }
  });
  // retrieve mastery list
  // useEffect(() => {
  //   if (summonerDetails) {
  //     if (!soloRank) {
  //       fetch(`/api/summoner/soloRank/${summonerDetails.id}`, {
  //         credentials: "same-origin",
  //       })
  //         .then((response) => response.text())
  //         .then((data) => {
  //           const retrieved_soloRank = JSON.parse(data);
  //           setSoloRank(retrieved_soloRank);
  //           //console.log(retrieved_soloRank);
  //         });
  //     }
  //   }
  // });

  if (!summonerName || !summonerDetails || !soloRank) {
    return (
      <LoadingSpinner/>
    );
  } else {
    return (
      <>
        <div className="jumbotron jumbotron-fluid home-hero">
          <div className="container text-center">
            <h1 className="display-4">Welcome, {summonerName}!</h1>
            <img
              style={{ width: "25%" }}
              src={require("../../images/rankemblems/Emblem_Silver.png")}
            ></img>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <ul>
                <li><h3 className="text-center">{summonerName}</h3></li>
                <li className="text-center">Level: {summonerDetails.summonerLevel}</li>
                <li className="text-center">Rank: {soloRank.tier} {soloRank.rank}</li>
                <li className="text-center">MMR: {soloRank.leaguePoints}</li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <h3 className="text-center">Champion Mastery</h3>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <h3 className="text-center">Recent Matches</h3>
            </div>
          </div>
        </div>
      </>
    );
  }
}
