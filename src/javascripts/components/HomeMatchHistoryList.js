import React, { useEffect, useState } from "react";
export function HomeMatchHistoryList(props) {
 const m = props.match;


  if (!m) {
    return <tr><td>Loading...</td></tr>;
  } else {
      var date = new Date(m.timestamp);
      date = date.toDateString();
      date = date.slice(0,10);
    return (
      <>
        <tr>
          <td>{m.role}</td>
          <td>{m.lane}</td>
          <td>{date}</td>
        </tr>
      </>
    );
  }

}