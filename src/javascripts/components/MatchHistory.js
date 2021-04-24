import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { LoadingSpinner } from "./LoadingSpinner";
import { SingleMatch } from "./SingleMatch"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

export function MatchHistory(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [summonerName, setSummonerName] = useState();
  const [summonerDetails, setSummonerDetails] = useState();
  const [matchList, setMatchList] = useState();

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

  if (!summonerName || !summonerDetails || !matchList) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        <h1 className="mt-5 py-2 font-weight-bold text-secondary text-center">
          Match History
        </h1>
        <div className="container">
          <div className="row">
            <div className="col">
              <Accordion>
                
                    {matchList.map((m) => {
                        return (
                        <SingleMatch
                            key={m.gameId}
                            match={m}
                            
                        />
                        );
                    })}
               
              </Accordion>
            </div>
          </div>
        </div>
      </>
    );
  }
}
