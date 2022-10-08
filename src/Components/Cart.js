import React, { Component } from "react";
import { BsCart3 } from "react-icons/bs";
import "../App.css";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  open = () => {
    this.setState({ isOpen: true });
  };
  close = () => {
    this.setState({ isOpen: false });
  };
  render() {
    let cartQuantity = this.props.cartItems.reduce((acc, cv) => {
      acc = acc + cv.quantity;
      return acc;
    }, 0);
    let itemsTotal = this.props.cartItems.reduce((acc, cv) => {
      acc = acc + cv.quantity * cv.price;
      return acc;
    }, 0);
    return (
      <div>
        {this.state.isOpen ? (
          <OpenCart
            closeCart={this.close}
            cartItems={this.props.cartItems}
            handleDecrement={this.props.handleDecrement}
            handleIncrement={this.props.handleIncrement}
            handleDelete={this.props.handleDelete}
            cartQuantity={cartQuantity}
            itemsTotal={itemsTotal}
          />
        ) : (
          <ClosedCart
            openCart={this.open}
            cartItems={this.props.cartItems}
            cartQuantity={cartQuantity}
          />
        )}
      </div>
    );
  }
}

function ClosedCart(props) {
  // console.log(props.openCart,"uuhy")
  return (
    <div onClick={props.openCart} className="cart_header">
      <div className="cart_icon_main">
        <BsCart3 className="cart_icon_m" />
        <span>{props.cartQuantity}</span>
      </div>
    </div>
  );
}

function OpenCart(props) {
  return (
    <div className="open_cart">
      <div className="cart_close">
        <span onClick={props.closeCart}>X</span>
      </div>
      <div>
        <div className="cart_icon_inside">
          <BsCart3 className="cart_icon" />
          <span>{props.cartQuantity}</span>
          <p>Cart</p>
          <hr />
          {props.cartItems.map((ci) => {
            return (
              <div className="just_hr">
                <div className="cart_items">
                  <div>
                    <img
                      className="cart_item_img"
                      src={`/products/${ci.sku}` + `_2.jpg`}
                      alt="cart"
                    />
                  </div>
                  <div className="cart_items_info">
                    <h4>{ci.title}</h4>
                    <h5>
                      {ci.availableSizes[0]} | {ci.style}
                    </h5>
                    <h5>Quanitity:{ci.quantity}</h5>
                  </div>
                  <div className="cart_items_info cart_items_todo">
                    <span onClick={() => props.handleDelete(ci.id)}>X</span>
                    <h4>$ {ci.price.toFixed(2)}</h4>
                    <div className="cart_items_inc_dec">
                      <span onClick={() => props.handleDecrement(ci.id)}>
                        -
                      </span>
                      <span onClick={() => props.handleIncrement(ci.id)}>
                        +
                      </span>
                    </div>
                  </div>
                </div>
                <hr />

              </div>
            );
          })}
        </div>

        {/* <div className="cart_footer">
          <h5>Subtotal:{props.itemsTotal.toFixed(2)}</h5>

          <button className="checkout">Checkout</button>
        </div> */}
      </div>
    </div>
  );
}
