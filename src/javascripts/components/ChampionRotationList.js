import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { LoadingSpinner } from "./LoadingSpinner";
import { ChampionCard } from "./ChampionCard"

export function ChampionRotationList(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [summonerName, setSummonerName] = useState();
  const [summonerDetails, setSummonerDetails] = useState();
  const [champMastery, setChampMastery] = useState();

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

  if (!summonerName || !summonerDetails || !champMastery) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        <h1 className="m-3 font-weight-bold text-secondary text-center">
          Champion Mastery
        </h1>
        <div className="container">
          <div className="row">
            {champMastery.map((cm) => {
              return <ChampionCard key={cm.championId} champion={cm} />;
            })}
          </div>
        </div>
      </>
    );
  }
}
