import React from "react";
import SearchFeed from "./searchFeed";
import WorkFeed from "./workFeed";
import OrdersFeed from "./ordersFeed";
import QuotesFeed from "./quotesFeed";
import CollectionFeed from "./collectionFeed";
import DevData from "./devData";
import { Link } from "react-router-dom";

const Home = ({
  jobs,
  handleCollected,
  handleComplete,
  search,
  setSearch,
  searchResults,
}) => {
  const clearDatabase = () => {
    console.log("deleted");
  };
  const populateDatabase = () => {
    console.log(DevData);
  };
  return (
    <div className="home-page">
      <section>
        <SearchFeed
          search={search}
          setSearch={setSearch}
          searchResults={searchResults}
        />
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
          handleCollected={handleCollected}
          handleComplete={handleComplete}
        />
        <QuotesFeed jobs={jobs} />
        <CollectionFeed jobs={jobs} />
      </section>
      <section>
        <Link to={`/form`}>Add New Item</Link>
        <button
          onClick={() => {
            populateDatabase();
          }}
        >
          Populate database
        </button>
        <button
          onClick={() => {
            clearDatabase();
          }}
        >
          Clear database
        </button>
      </section>
    </div>
  );
};

export default Home;
