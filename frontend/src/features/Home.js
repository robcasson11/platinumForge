import React from "react";

const Home = ({ jobs }) => {
  return (
    <div>
      {jobs ? (
        <ul>
          {jobs.map((jobs) => {
            return (
              <li key={jobs.id}>
                <p>{jobs.id}</p>
                <h2>{jobs.fName}</h2>
                <h3>{jobs.itemDescription}</h3>
                <br />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Loading Jobs...</p>
      )}
    </div>
  );
};

export default Home;
