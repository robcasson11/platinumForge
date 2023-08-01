import React from "react";
import { useState } from "react";
import DashBoard from "./dashBoard";
import { Outlet } from "react-router-dom";
import NavBar from "./navBar";

const Layout = ({
  jobs,
  setJobs,
  search,
  setSearch,
  searchResults,
  handleCollected,
  handleComplete,
  handleMaterialsOrdered,
  handleGoAhead,
  smallScreen,
  setSmallScreen,
}) => {
  const [workButton, setWorkButton] = useState(false);
  const [quoteButton, setQuoteButton] = useState(false);
  const [orderButton, setOrderButton] = useState(false);
  const [collectButton, setCollectButton] = useState(false);
  return (
    <>
      <div className="grid-container">
        <div className="grid-left">
          <NavBar
            workButton={workButton}
            quoteButton={quoteButton}
            orderButton={orderButton}
            collectButton={collectButton}
            setWorkButton={setWorkButton}
            setQuoteButton={setQuoteButton}
            setOrderButton={setOrderButton}
            setCollectButton={setCollectButton}
            setSmallScreen={setSmallScreen}
          />
          <DashBoard
            workButton={workButton}
            quoteButton={quoteButton}
            orderButton={orderButton}
            collectButton={collectButton}
            jobs={jobs}
            setJobs={setJobs}
            search={search}
            setSearch={setSearch}
            searchResults={searchResults}
            handleCollected={handleCollected}
            handleComplete={handleComplete}
            handleMaterialsOrdered={handleMaterialsOrdered}
            handleGoAhead={handleGoAhead}
            smallScreen={smallScreen}
          />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
