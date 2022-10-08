import React from "react";
import Products from "./Products";
import "../App.css";

export default function Main(props) {
  return (
    <div className="main">
      <Products
        products={props.products}
        handleClick={props.handleClick}
        selectedSizes={props.selectedSizes}
        handleAddToCart={props.handleAddToCart}
      />
    </div>
  );
}
