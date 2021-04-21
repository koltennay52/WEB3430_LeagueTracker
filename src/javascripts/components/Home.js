import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie'

export function Home(props) {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [summonerName, setSummonerName] = useState()

    useEffect(() => {
        if (!summonerName) {
          fetch('/api/v1/users/getSummonerName', {
            credentials: "same-origin"
          })
          .then(response => response.text())
          .then(data => {
            const retrieved_summonerName = JSON.parse(data);
            setSummonerName(retrieved_summonerName);
            //console.log(retrieved_summonerName);
          })
        }
      })

  
      if (!summonerName){
        return (<span className="text-center">Loading data...</span>)
      } else {

    return (
        <>  
            <div>
                <h2 className="text-center">Welcome, {summonerName}!</h2>
            </div>
            
        </>

    );

}
} 