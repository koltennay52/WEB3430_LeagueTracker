import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export function ChampionCard(props) {
  const [champion, setChampion] = useState();
  const cm = props.champion;

  useEffect(() => {
    if (cm) {
      if (!champion) {
        fetch(`/api/champions/${cm.championId}`, {
          credentials: "same-origin",
        })
          .then((response) => response.text())
          .then((data) => {
            const retrieved_champion = JSON.parse(data);
            setChampion(retrieved_champion);
            console.log(retrieved_champion);
          });
      }
    }
  });

  if (!cm || !champion) {
    return <LoadingSpinner />;
  } else {
    var date = new Date(cm.lastPlayTime);
    date = date.toDateString();
    date = date.slice(0,10);

    return (
      <div className="col-md-6 col-lg-4 my-3 mx-auto">
        <div className="card" style={{width: "18rem"}}>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${champion.id}_0.jpg`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title text-center">{champion.name}</h5>
            <ul className="list-group list-group-flush">
            <li className="list-group-item">Mastery Level: {cm.championLevel}</li>
            <li className="list-group-item">Points: {cm.championPoints}</li>
            <li className="list-group-item">Last Played: {date}</li>
          </ul>
            <p className="card-text">
              {champion.blurb}
            </p>
          </div>
          
        </div>
      </div>
    );
  }
}
