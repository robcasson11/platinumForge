import React from "react";
import api from "../api/jobs";
import SearchFeed from "./searchFeed";
import WorkFeed from "./workFeed";
import OrdersFeed from "./ordersFeed";
import QuotesFeed from "./quotesFeed";
import CollectionFeed from "./collectionFeed";
import DevData from "../data/devData";
import { Link } from "react-router-dom";

const DashBoard = ({
  jobs,
  handleCollected,
  handleComplete,
  handleMaterialsOrdered,
  handleGoAhead,
  search,
  setSearch,
  searchResults,
}) => {
  const clearDatabase = async () => {
    try {
      await api.delete("/jobs", {});
    } catch (err) {
      console.log(`Error with clear database : ${err}`);
    }
  };

  const populateDatabase = async () => {
    clearDatabase();
    DevData.map(async (data) => {
      try {
        await api.post("/jobs", data);
      } catch (err) {
        console.log(`Error : ${err.message}`);
      }
      console.log(data.jobNum);
    });
  };
  return (
    <div className="dashBoard-page">
      <section>
        <SearchFeed
          search={search}
          setSearch={setSearch}
          searchResults={searchResults}
        />
        <div className={search ? "hidden" : "devButtons"}>
          <button className="button">
            <span>
              <Link to={`/form`}>Add New Item</Link>
            </span>
          </button>

          <button
            className="button"
            onClick={() => {
              populateDatabase();
            }}
          >
            <span>Populate database</span>
          </button>
          <button
            className="button"
            onClick={() => {
              clearDatabase();
            }}
          >
            <span>Clear database</span>
          </button>
        </div>
        <WorkFeed
          jobs={jobs}
          search={search}
          handleCollected={handleCollected}
          handleComplete={handleComplete}
        />
      </section>
      <section>
        <OrdersFeed
          jobs={jobs}
          handleMaterialsOrdered={handleMaterialsOrdered}
        />
        <QuotesFeed
          jobs={jobs}
          handleCollected={handleCollected}
          handleComplete={handleComplete}
        />
        <CollectionFeed
          jobs={jobs}
          handleCollected={handleCollected}
          handleComplete={handleComplete}
          handleGoAhead={handleGoAhead}
        />
      </section>
    </div>
  );
};

export default DashBoard;
