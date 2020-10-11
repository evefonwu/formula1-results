import React from "react";

function ResultsTable({ results }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Postion</th>
            <th>Number</th>
            <th>Driver</th>
            <th>Car</th>
            <th>Laps</th>
            <th>Time/Retired</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td> {result.position ? result.position : "NC"}</td>
              <td>{result.number}</td>
              <td>{result.driver}</td>
              <td className="constructor">{result.car}</td>
              <td>{result.laps}</td>
              <td>{result.time}</td>
              <td>{result.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ResultsTable;
