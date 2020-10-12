import React from "react";

function Summary({ constructors }) {
  const title = "All-time Team Points";
  return (
    <>
      <div className="summary">
        <h3 className="summary-title">{title}</h3>
        <ul className="constructors-list">
          {constructors.map((c, index) => (
            <li key={index} className="constructor-item">
              <span className="constructor">{c.constructor}</span>
              <span className="points">{c.points}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Summary;
