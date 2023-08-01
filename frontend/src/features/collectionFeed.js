import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDone } from "react-icons/md";

const CollectionFeed = ({
  collectButton,
  search,
  jobs,
  handleCollected,
  handleComplete,
  handleGoAhead,
}) => {
  const navigate = useNavigate();

  const collectionsList = jobs.filter((job) => {
    return !job.collected & job.quoted || job.completed & !job.collected;
  });

  const collectedAndRedirect = (id) => {
    handleCollected(id);
    navigate("/dashBoard");
  };

  const goAheadAndRedirect = (id) => {
    handleGoAhead(id);
    navigate("/dashBoard");
  };

  return (
    <section className={search || !collectButton ? "hidden" : "feed"}>
      <h3>Collection Feed</h3>
      {collectionsList[0] ? (
        <table>
          <thead>
            <tr>
              <th>Job</th>
              <th>Customer Name</th>
              <th>Due Date</th>
              <th>Go Ahead</th>
              <th>Collected</th>
            </tr>
          </thead>
          <tbody>
            {collectionsList.map((job) => {
              return (
                <tr key={job.id}>
                  <td>
                    <Link to={`jobPage/${job.id}`}>
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
                    {!job.completed && (
                      <button onClick={() => goAheadAndRedirect(job._id)}>
                        <MdDone />
                      </button>
                    )}
                  </td>
                  <td>
                    {job.completed && (
                      <button onClick={() => collectedAndRedirect(job._id)}>
                        <MdDone />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No Collections Today</p>
      )}
    </section>
  );
};

export default CollectionFeed;
