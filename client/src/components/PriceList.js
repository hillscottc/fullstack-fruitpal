import React from "react";
import mexico from "../images/mexico.jpg";
import argentina from "../images/argentina.jpg";
import brazil from "../images/brazil.jpg";
import chile from "../images/chile.jpg";
import columbia from "../images/columbia.jpg";
import venezuela from "../images/venezuela.jpg";

function QueryResult(queryResult) {
  const flagMap = {
    MX: <img alt="flag" className="flag" src={mexico} />,
    BR: <img alt="flag" className="flag" src={brazil} />,
    CH: <img alt="flag" className="flag" src={chile} />,
    AR: <img alt="flag" className="flag" src={argentina} />,
    CL: <img alt="flag" className="flag" src={columbia} />,
    VZ: <img alt="flag" className="flag" src={venezuela} />,
  };

  const {
    ctry_code,
    total_cost,
    fixed_cost,
    variable_cost,
  } = queryResult.queryResult;
  return (
    <div className="price-list__row">
      <div className="price-list__row__item">
        {flagMap[ctry_code]}
        {ctry_code}
      </div>
      <div className="price-list__row__item">
        {total_cost && total_cost.toFixed(2)}
      </div>
      <div className="price-list__row__item">
        {fixed_cost && fixed_cost.toFixed(2)}
      </div>
      <div className="price-list__row__item">
        {variable_cost && variable_cost.toFixed(2)}
      </div>
    </div>
  );
}

export default function PriceList({ priceQueryResults }) {
  return (
    <div>
      <header className="price-list__header">
        <div className="price-list__header__item">COUNTRY</div>
        <div className="price-list__header__item">TOTAL COST</div>
        <div className="price-list__header__item">FIXED COST</div>
        <div className="price-list__header__item">VAR COST</div>
      </header>
      {priceQueryResults.map((queryResult, ndx) => {
        return <QueryResult key={ndx} queryResult={queryResult} />;
      })}
    </div>
  );
}
