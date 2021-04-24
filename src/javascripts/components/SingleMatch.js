import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { ScoreboardRow } from "./ScoreboardRow"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

export function SingleMatch(props) {
  const [matchDetails, setMatchDetails] = useState();
  const m = props.match;

  // retrieve match results
  useEffect(() => {
    if (!matchDetails) {
      fetch(`/api/matches/result/${m.gameId}/${m.champion}`, {
        credentials: "same-origin",
      })
        .then((response) => response.text())
        .then((data) => {
          const retrieved_matchDetails = JSON.parse(data);
          setMatchDetails(retrieved_matchDetails);
        });
    }
  });

  if (!matchDetails) {
    return <LoadingSpinner />;
  } else {
    var matchDate = new Date(matchDetails.date);
    matchDate = matchDate.toDateString();
    matchDate = matchDate.slice(0, 10);
    var result;
    if (matchDetails.win) result = "Win";
    else result = "Loss";
    return (
      <>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <strong>{result} </strong> KDA: {matchDetails.kills}/
              {matchDetails.deaths}/{matchDetails.assists} {matchDate}
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Summoner</th>
                  <th scope="col">KDA</th>
                  <th scope="col">Damage</th>
                </tr>
              </thead>
              <tbody>
                {matchDetails.participants.map((p) => {
                  return <ScoreboardRow key={p.participantId} participant={p} />;
                })}
              </tbody>
            </table>
          </AccordionItemPanel>
        </AccordionItem>
      </>
    );
  }
}
