import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdDone } from "react-icons/md";

const SearchFeed = ({
  search,
  setSearch,
  searchResults,
  handleCollected,
  handleComplete,
}) => {
  const navigate = useNavigate();

  const collectedAndRedirect = (id) => {
    handleCollected(id);
    navigate("/dashBoard");
  };

  const completeAndRedirect = (id) => {
    handleComplete(id);
    navigate("/dashBoard");
  };

  return (
    <section className="feed">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <br />
        <input
          id="search"
          type="text"
          value={search}
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      {search ? (
        <table>
          <thead>
            <tr>
              <th>Job</th>
              <th>Item</th>
              <th>Work Required</th>
              <th>Completed</th>
              <th>Collected</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((job) => {
              return (
                <tr key={job.id}>
                  <td>
                    <Link to={`jobPage/${job.id}`}>
                      <p>{job.id}</p>
                    </Link>
                  </td>
                  <td>
                    <p>
                      <Link to={`jobPage/${job.id}`}>
                        {job.itemDescription.length < 8
                          ? job.itemDescription
                          : job.itemDescription.slice(0, 8) + "..."}
                      </Link>
                    </p>
                  </td>
                  <td>
                    <Link to={`jobPage/${job.id}`}>
                      <p>{job.workRequired}</p>
                    </Link>
                  </td>
                  <td>
                    <button
                      style={{
                        background: job.completed ? "lightSkyBlue" : "none",
                      }}
                      onClick={() => completeAndRedirect(job._id)}
                    >
                      <MdDone />
                    </button>
                  </td>
                  <td>
                    <button
                      style={{
                        background: job.collected ? "lightSkyBlue" : "none",
                      }}
                      onClick={() => collectedAndRedirect(job._id)}
                    >
                      <MdDone />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </section>
  );
};

export default SearchFeed;
