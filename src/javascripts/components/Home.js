import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { LoadingSpinner } from "./LoadingSpinner";
import { HomeChampMasteryList } from "./HomeChampMasteryList";
import { HomeMatchHistoryList } from "./HomeMatchHistoryList";

export function Home(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [summonerName, setSummonerName] = useState();
  const [summonerDetails, setSummonerDetails] = useState();
  const [soloRank, setSoloRank] = useState();
  const [champMastery, setChampMastery] = useState();
  const [matchList, setMatchList] = useState();

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
  // retrieve rank details
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
  // retrieve mastery list
  useEffect(() => {
    if (summonerDetails) {
      if (!champMastery) {
        fetch(`/api/champions/mastery/${summonerDetails.id}`, {
          credentials: "same-origin",
        })
          .then((response) => response.text())
          .then((data) => {
            const retrieved_mastery = JSON.parse(data);
            setChampMastery(retrieved_mastery);
            //console.log(retrieved_mastery);
          });
      }
    }
  });

  // retrieve match list
  useEffect(() => {
    if (summonerDetails) {
      if (!matchList) {
        fetch(`/api/matches/${summonerDetails.accountId}`, {
          credentials: "same-origin",
        })
          .then((response) => response.text())
          .then((data) => {
            const retrieved_matchList = JSON.parse(data);
            setMatchList(retrieved_matchList);
            //console.log(retrieved_matchList);
          });
      }
    }
  });

  if (
    !summonerName ||
    !summonerDetails ||
    !soloRank ||
    !champMastery ||
    !matchList
  ) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        <div className="jumbotron jumbotron-fluid home-hero">
          <div className="container text-center">
            <h1 className="display-4">Welcome, {summonerName}!</h1>
            <img
              style={{ width: "25%" }}
              src={`http://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${summonerDetails.profileIconId}.png`}
              className="rounded-corners"
              alt="..."
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-5  col-sm-12 mx-auto">
              <a className="text-info" href="championrotation"><h3 className="text-center">Mastery</h3></a>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Champion</th>
                    <th scope="col">Points</th>
                    <th scope="col">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {champMastery.map((cm) => {
                    return (
                      <HomeChampMasteryList
                        key={cm.championId}
                        champMastery={cm}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div
              className="col-lg-2 col-sm-12 mx-auto py-3"
              style={{ width: "50%" }}
            >
              <ul className="list-group">
                <li>
                  <h3 className="text-center">Statistics</h3>
                </li>
                <li className="text-center list-group-item">
                  Level: {summonerDetails.summonerLevel}
                </li>
                <li className="text-center list-group-item">
                  Rank: {soloRank.tier} {soloRank.rank}
                </li>
                <li className="text-center list-group-item">
                  MMR: {soloRank.leaguePoints}
                </li>
              </ul>
            </div>
            <div className="col-lg-5  col-sm-12 mx-auto">
              <a className="text-info" href="/matchhistory"><h3 className="text-center">Recent Matches</h3></a>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Role</th>
                    <th scope="col">Lane</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {matchList.map((ml) => {
                    return <HomeMatchHistoryList key={ml.gameId} match={ml} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
