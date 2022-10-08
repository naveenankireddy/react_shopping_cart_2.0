import React from "react";
import "./App.css";
import Cart from "./Components/Cart";
import Main from "./Components/Main";
import Sidebar from "./Components/Sidebar";
import data from "./data.json";

class App extends React.Component {
  // console.log(data.products,"Hey fella i'm products")
  constructor() {
    super();
    this.state = {
      selectedSizes: [],
      cartItems: [],
    };
  }
  componentDidMount(){
    if(localStorage.carts){
      this.setState({cartItems:JSON.parse(localStorage.carts)})
    }
    window.addEventListener('beforeunload',this.handleUpdateLocaleStorage)
  }
  componentWillUnmount(){
    window.removeEventListener('beforeunload',this.handleUpdateLocaleStorage)
  }

  handleUpdateLocaleStorage=() => {
    localStorage.setItem("carts",JSON.stringify(this.state.cartItems))
  }
  handleAddToCart = (product) => {
    let isPresent =
      this.state.cartItems.findIndex(
        (findProduct) => findProduct.id === product.id
      ) !== -1;
    if (isPresent) {
      this.handleIncrement(product.id);
    } else {
      this.setState((prevState) => ({
        cartItems: prevState.cartItems.concat({ ...product, quantity: 1 }),
      }));
    }
  };

  handleIncrement = (id) => {
    this.setState((prevState) => {
      let updateQuantity = prevState.cartItems.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            quantity: p.quantity + 1,
          };
        }
        return p;
      });

      return {
        cartItems: updateQuantity,
      };
    });
  };

  handleDecrement = (id) => {
    this.setState((prevState) => {
      let updateQuantity = prevState.cartItems.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            quantity: p.quantity - 1,
          };
        }
        return p;
      });
      return {
        cartItems: updateQuantity,
      };
    });
  };
  handleDelete = (id) => {
    this.setState((prevState) => {
      let updateQuantity = prevState.cartItems.filter((p) => {
        return p.id !== id;
      });
      return {
        cartItems: updateQuantity,
      };
    });
  };

  handleClick = (size) => {
    if (this.state.selectedSizes.includes(size)) {
      this.setState((prevState) => ({
        selectedSizes: prevState.selectedSizes.filter((s) => s !== size),
      }));
    } else {
      this.setState((prevState) => ({
        selectedSizes: prevState.selectedSizes.concat(size),
      }));
    }
  };

  render() {
    return (
      <div className="App">
        <div className="flex-box">
          <Sidebar
            products={data.products}
            handleClick={this.handleClick}
            selectedSizes={this.state.selectedSizes}
          />
          <Main
            products={data.products}
            handleClick={this.handleClick}
            selectedSizes={this.state.selectedSizes}
            handleAddToCart={this.handleAddToCart}
          />
          <div className="cart">
            <Cart
              cartItems={this.state.cartItems}
              handleDecrement={this.handleDecrement}
              handleIncrement={this.handleIncrement}
              handleDelete={this.handleDelete}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
