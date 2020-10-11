import React from "react";

function Header(props) {
  return (
    <div className="header">
      <div className="branding">
        Formula1 Results - Team points summary + Results by year for the
        Australian Gran Prix
      </div>
      <div className="branding">
        Applying PostgreSQL queries, schema, transaction, constraints, view,
        materialized view
      </div>
    </div>
  );
}

export default Header;
