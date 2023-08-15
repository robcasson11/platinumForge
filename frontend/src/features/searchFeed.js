import React from "react";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useNavigate, Link } from "react-router-dom";
import { MdDone } from "react-icons/md";

const SearchFeed = () => {
  const { search, setSearch, searchResults, handleCollected, handleComplete } =
    useContext(DataContext);

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
              <th>Customer</th>
              <th>Item</th>
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
                    <Link to={`jobPage/${job.id}`}>
                      <p>
                        {job.fName} {job.lName}
                      </p>
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
