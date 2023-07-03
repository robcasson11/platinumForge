import React from "react";
import Card from "./card";

const SearchFeed = ({ search, setSearch, searchResults }) => {
  return (
    <section className="search-feed">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <br />
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      {search ? (
        <ul>
          {searchResults.map((job) => {
            return <Card key={job.id} job={job} />;
          })}
        </ul>
      ) : null}
    </section>
  );
};

export default SearchFeed;
