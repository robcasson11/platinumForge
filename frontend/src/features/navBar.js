import React from "react";

const NavBar = ({
  workButton,
  quoteButton,
  orderButton,
  collectButton,
  setWorkButton,
  setQuoteButton,
  setOrderButton,
  setCollectButton,
  setSmallScreen,
}) => {
  const handleToggle = (e) => {
    e.preventDefault();
    const { id } = e.target;
    if (id === "work") {
      setWorkButton(workButton ? false : true);
      setSmallScreen(false);
    } else {
      setWorkButton(false);
    }
    if (id === "order") {
      setOrderButton(orderButton ? false : true);
      setSmallScreen(false);
    } else {
      setOrderButton(false);
    }
    if (id === "quote") {
      setQuoteButton(quoteButton ? false : true);
      setSmallScreen(false);
    } else {
      setQuoteButton(false);
    }
    if (id === "collect") {
      setCollectButton(collectButton ? false : true);
      setSmallScreen(false);
    } else {
      setCollectButton(false);
    }
  };

  return (
    <section className="nav-bar">
      <div>
        <button id="work" onClick={handleToggle}>
          Workload
        </button>
        <button id="order" onClick={handleToggle}>
          Orders
        </button>
        <button id="quote" onClick={handleToggle}>
          Quotes
        </button>
        <button id="collect" onClick={handleToggle}>
          Collections
        </button>
      </div>
    </section>
  );
};

export default NavBar;
