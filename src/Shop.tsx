import React, { Component } from "react";
import { CardElement } from "react-stripe-elements";
import PropTypes from "prop-types";
import axios from "axios";
import qs from "query-string-object";
import { injectStripe } from "react-stripe-elements";

const prices = {
  banana: 150,
  cucumber: 100,
};

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      cart: {
        banana: 0,
        cucumber: 0,
      },
    };
    this.handleCartChange = this.handleCartChange.bind(this);
    this.handleCartReset = this.handleCartReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCartChange(evt) {
    evt.preventDefault();
    const cart = this.state.cart;
    cart[evt.target.name] += parseInt(evt.target.value);
    this.setState({ cart });
  }

  handleCartReset(evt) {
    evt.preventDefault();
    this.setState({ cart: { banana: 0, cucumber: 0 } });
  }

  handleSubmit(evt) {
    // TODO
  }

  render() {
    const cart = this.state.cart;
    const fetching = this.state.fetching;
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{
          width: "550px",
          margin: "20px",
          padding: "10px",
          border: "2px solid lightseagreen",
          borderRadius: "10px",
        }}
      >
        <div>
          Banana{" "}
          {(prices.banana / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "usd",
          })}
          :
          <div>
            <button name="banana" value={1} onClick={this.handleCartChange}>
              +
            </button>
            <button
              name="banana"
              value={-1}
              onClick={this.handleCartChange}
              disabled={cart.banana <= 0}
            >
              -
            </button>
            {cart.banana}
          </div>
        </div>
        <div>
          Cucumber{" "}
          {(prices.cucumber / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "usd",
          })}
          :
          <div>
            <button name="cucumber" value={1} onClick={this.handleCartChange}>
              +
            </button>
            <button
              name="cucumber"
              value={-1}
              onClick={this.handleCartChange}
              disabled={cart.cucumber <= 0}
            >
              -
            </button>
            {cart.cucumber}
          </div>
        </div>
        <button onClick={this.handleCartReset}>Reset Cart</button>
        <div
          style={{
            width: "450px",
            margin: "10px",
            padding: "5px",
            border: "2px solid green",
            borderRadius: "10px",
          }}
        >
          <CardElement style={{ base: { fontSize: "18px" } }} />
        </div>
        {!fetching ? (
          <button
            type="submit"
            disabled={cart.banana === 0 && cart.cucumber === 0}
          >
            Purchase
          </button>
        ) : (
          "Purchasing..."
        )}
        Price:
        {(
          (cart.banana * prices.banana + cart.cucumber * prices.cucumber) /
          100
        ).toLocaleString("en-US", { style: "currency", currency: "usd" })}
      </form>
    );
  }
}

Shop.propTypes = {
  stripe: PropTypes.shape({
    createToken: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectStripe(Shop);
