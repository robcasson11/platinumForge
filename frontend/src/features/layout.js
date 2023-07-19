import React from "react";
import DashBoard from "./dashBoard";
import { Outlet } from "react-router-dom";

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
}) => {
  return (
    <div>
      <p>layout</p>
      <DashBoard
        jobs={jobs}
        setJobs={setJobs}
        search={search}
        setSearch={setSearch}
        searchResults={searchResults}
        handleCollected={handleCollected}
        handleComplete={handleComplete}
        handleMaterialsOrdered={handleMaterialsOrdered}
        handleGoAhead={handleGoAhead}
      />
      <Outlet />
    </div>
  );
};

export default Layout;
