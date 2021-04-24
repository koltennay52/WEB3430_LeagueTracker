import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { LoadingSpinner } from "./LoadingSpinner";
import { LeagueParticipant } from "./LeagueParticipant";

function titleCase(string){
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function SummonerLeague(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [summonerName, setSummonerName] = useState();
  const [summonerDetails, setSummonerDetails] = useState();
  const [soloRank, setSoloRank] = useState();
  const [leagueEntries, setLeagueEntries] = useState();

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
            //console.log(retrieved_summonerDetails);
          });
      }
    }
  });
  //retrieving solo ranked info
  useEffect(() => {
    if (summonerDetails) {
      if (!soloRank) {
        fetch(`/api/league/soloRank/${summonerDetails.id}`, {
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

  //retrieving rank entries info
  useEffect(() => {
    if (soloRank) {
      if (!leagueEntries) {
        fetch(`/api/league/soloRankEntries/${soloRank.leagueId}`, {
          credentials: "same-origin",
        })
          .then((response) => response.text())
          .then((data) => {
            const retrieved_leagueEntries = JSON.parse(data);
            setLeagueEntries(retrieved_leagueEntries);
            //console.log(retrieved_leagueEntries);
          });
      }
    }
  });

  if (!summonerName || !summonerDetails || !soloRank || !leagueEntries) {
    return <LoadingSpinner />;
  } else {
    var participants = leagueEntries.entries;
    participants.sort((a, b) => b.leaguePoints - a.leaguePoints);
    // console.log(participants.length)
    var rankPicture = titleCase(soloRank.tier);
    return (
      <>
        <h1 className="mt-5 py-2 font-weight-bold text-secondary text-center">
          Summoner League
        </h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 mx-auto">
              <ul>
                <li>
                  <h4>Queue: {soloRank.queueType}</h4>
                </li>
                <li>
                  <h4>League Name: {leagueEntries.name}</h4>
                </li>
                <li>
                  <h4>
                    Rank: {soloRank.tier} {soloRank.rank}
                  </h4>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 col-md-6 mx-auto text-center">
              <img
                style={{ width: "75%" }}
                src={require(`../../images/rankemblems/Emblem_${rankPicture}.png`)}
              ></img>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-md-10 offset-lg-1 offset-md-1 mx-auto">
              <div style={{ overflowX: "auto", overflowY: "auto" }}>
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Summoner Name</th>
                      <th scope="col">Wins</th>
                      <th scope="col">Losses</th>
                      <th scope="col">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((p, index) => {
                      return <LeagueParticipant key={index} participant={p} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
