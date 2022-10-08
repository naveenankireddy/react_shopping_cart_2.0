import React from "react";
import "../App.css";

export default function Sidebar(props) {
  let sizes = props.products.reduce((acc, cv) => {
    acc = acc.concat(cv.availableSizes);
    return acc;
  }, []);
  let uniqueSizes = [...new Set(sizes)];
  // console.log(uniqueSizes,"sizes buddy")
  return (
    <div className="sidebar">
      <h3>Sizes:</h3>
      {uniqueSizes.map((s) => {
        return (
          <span
          key={s}
            className={props.selectedSizes.includes(s) ? "active" : ""}
            onClick={() => props.handleClick(s)}
          >
            {s}
          </span>
        );
      })}
    </div>
  );
}
