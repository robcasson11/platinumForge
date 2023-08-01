import React from "react";
import SearchFeed from "./searchFeed";
import WorkFeed from "./workFeed";
import OrdersFeed from "./ordersFeed";
import QuotesFeed from "./quotesFeed";
import CollectionFeed from "./collectionFeed";
import useWindowSize from "../hooks/useWindowSize";

const DashBoard = ({
  workButton,
  quoteButton,
  orderButton,
  collectButton,
  jobs,
  handleCollected,
  handleComplete,
  handleMaterialsOrdered,
  handleGoAhead,
  search,
  setSearch,
  searchResults,
  smallScreen,
}) => {
  const { width, height } = useWindowSize();
  return (
    <>
      <SearchFeed
        search={search}
        setSearch={setSearch}
        searchResults={searchResults}
        handleCollected={handleCollected}
        handleComplete={handleComplete}
      />
      <section
        className={
          smallScreen & (width < 1100 || height < 550) ? "hidden" : "feed"
        }
      >
        <WorkFeed
          workButton={workButton}
          jobs={jobs}
          search={search}
          handleCollected={handleCollected}
          handleComplete={handleComplete}
        />
        <OrdersFeed
          orderButton={orderButton}
          search={search}
          jobs={jobs}
          handleMaterialsOrdered={handleMaterialsOrdered}
        />
        <QuotesFeed
          quoteButton={quoteButton}
          search={search}
          jobs={jobs}
          handleCollected={handleCollected}
          handleComplete={handleComplete}
        />
        <CollectionFeed
          collectButton={collectButton}
          search={search}
          jobs={jobs}
          handleCollected={handleCollected}
          handleComplete={handleComplete}
          handleGoAhead={handleGoAhead}
        />
      </section>
    </>
  );
};

export default DashBoard;
