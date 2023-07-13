import React from "react";
import { Link } from "react-router-dom";

const QuotesFeed = ({ jobs }) => {
  const quotesList = jobs
    .filter((job) => {
      return job.quoteRequired && !job.quoted;
    })
    .map((job) => {
      return job;
    });

  return (
    <section className="quotes-feed">
      <h3>Quotes Feed</h3>
      {quotesList[0] ? (
        <table>
          <thead>
            <tr>
              <th>Job</th>
              <th>Customer Name</th>
              <th>Work To Quote For</th>
              <th>Quoted</th>
            </tr>
          </thead>
          <tbody>
            {quotesList.map((job) => {
              return (
                <tr key={job.id}>
                  <td>
                    <Link to={`/jobPage/${job.id}`}>
                      <p>{job.id}</p>
                    </Link>
                  </td>
                  <td>
                    <p>{job.fName}</p>
                  </td>
                  <td>
                    <p>{job.workRequired}</p>
                  </td>
                  <td>
                    <Link to={`/quotePage/${job.id}`}>Q</Link>
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
