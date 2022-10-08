import React from "react";
import "../App.css";

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderedItems: "",
    };
  }
  handleOrderBy = (event) => {
    this.setState({ orderedItems: event.target.value });
  };

  handleProducts = (order, sizes, products) => {
    let sortedProducts = [...products];
    if (sizes.length > 0) {
      sortedProducts = sortedProducts.filter((p) => {
        for (let size of sizes) {
          if (p.availableSizes.includes(size)) {
            return true;
          }
        }
      });
    }

    if (order === "high-to-low") {
      return (sortedProducts = sortedProducts.sort(
        (a, b) => b.price - a.price
      ));
    }
    if (order === "low-to-high") {
      return (sortedProducts = sortedProducts.sort(
        (a, b) => a.price - b.price
      ));
    }
    return sortedProducts;
  };

  render() {
    let products = this.handleProducts(
      this.state.orderedItems,
      this.props.selectedSizes,
      this.props.products
    );
    // console.log(products, "ordered buddy");
    return (
      <div>
        <div className="flex-box main-header">
          <div>
            <p>{`${products.length} product${
              products.length > 1 ? "s" : ""
            } found`}</p>
          </div>
          <div>
            Order By
            <select
              value={this.state.orderedItems}
              onChange={this.handleOrderBy}
            >
              <option value="">Select</option>
              <option value="high-to-low">High-To-Low</option>
              <option value="low-to-high">Low-To-High</option>
            </select>
          </div>
        </div>

        <div className="products-flex">
          {products.map((item) => {
            return (
              <Product
              key={item.id}
                product={item}
                handleAddToCart={this.props.handleAddToCart}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

function Product(props) {
  //   console.log(props.product, "iuhuireuerguer");
  return (
    <div className="product">
      <img
        src={`/products/${props.product.sku}` + `_1.jpg`}
        alt={props.product.title}
      />
      <div className="product-container">
        <h2>{props.product.title}</h2>
        <hr />
        <h3>$ {props.product.price.toFixed(2)}</h3>
        <button onClick={()=>props.handleAddToCart(props.product)} className="add-to-cart">Add to cart</button>
      </div>
    </div>
  );
}
