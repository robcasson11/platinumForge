import React from "react";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Link } from "react-router-dom";

const QuotesFeed = () => {
  const { quoteButton, search, jobs } = useContext(DataContext);

  const quotesList = jobs
    .filter((job) => {
      return job.quoteRequired && !job.quoted;
    })
    .map((job) => {
      return job;
    });

  return (
    <section className={search || !quoteButton ? "hidden" : "feed"}>
      <h3>Jobs to be quoted for</h3>
      {quotesList[0] ? (
        <table>
          <thead>
            <tr>
              <th>Job</th>
              <th>Item Description</th>
              <th>Work To Quote For</th>
            </tr>
          </thead>
          <tbody>
            {quotesList.map((job) => {
              return (
                <tr key={job.id}>
                  <td>
                    <Link to={`quotePage/${job.id}`}>
                      <p>{job.id}</p>
                    </Link>
                  </td>
                  <td>
                    <Link to={`quotePage/${job.id}`}>
                      <p>{job.itemDescription}</p>
                    </Link>
                  </td>
                  <td>
                    <Link to={`quotePage/${job.id}`}>
                      <p>{job.quoteDetails}</p>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No Quotes</p>
      )}
    </section>
  );
};

export default QuotesFeed;
