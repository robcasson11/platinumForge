import React from "react";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import SearchFeed from "./searchFeed";
import WorkFeed from "./workFeed";
import OrdersFeed from "./ordersFeed";
import QuotesFeed from "./quotesFeed";
import CollectionFeed from "./collectionFeed";
import useWindowSize from "../hooks/useWindowSize";

const DashBoard = () => {
  const { smallScreen } = useContext(DataContext);

  const { width, height } = useWindowSize();

  return (
    <>
      <SearchFeed />
      <section
        className={
          smallScreen & (width < 1100 || height < 550) ? "hidden" : "feed"
        }
      >
        <WorkFeed />
        <OrdersFeed />
        <QuotesFeed />
        <CollectionFeed />
      </section>
    </>
  );
};

export default DashBoard;
