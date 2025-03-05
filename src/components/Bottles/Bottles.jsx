import React, { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottles.css";
import {
  addToLS,
  getStoredCart,
  removeFromLS,
} from "../../utilities/localstorage";
import Cart from "../Cart/Cart";
const Bottles = () => {
  const [bottles, setBottles] = useState([]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("bottles.json")
      .then((response) => response.json())
      .then((data) => setBottles(data));
  }, []);

  // load cart from local storage

  useEffect(() => {
    console.log(bottles.length);
    if (bottles.length > 0) {
      const storedCart = getStoredCart();
      console.log(storedCart);
      const savedCart = [];
      for (const id of storedCart) {
        console.log(id);

        const bottle = bottles.find((bottle) => bottle.id === id);

        if (bottle) {
          savedCart.push(bottle);
        }
      }

      console.log("Saved Cart", savedCart);
      setCart(savedCart);
    }
  }, [bottles]);

  const handleAddToCart = (bottle) => {
    // console.log("Bottle Added", bottle);

    const newCart = [...cart, bottle];
    setCart(newCart);

    addToLS(bottle.id);
  };

  const handleRemoveFromCart = (id) => {
    // visual cart remove

    const newCart = cart.filter((bottle) => bottle.id !== id);
    setCart(newCart);

    // remove from local storage

    removeFromLS(id);
  };

  return (
    <div>
      <h2>Bottles Available :{bottles.length} </h2>
      {/* <h4>Cart: {cart.length} </h4>  */}

      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} />

      <div className="bottle-container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Bottles;
