import { React } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdDone } from "react-icons/md";

const WorkFeed = ({
  workButton,
  jobs,
  handleCollected,
  handleComplete,
  search,
}) => {
  console.log(workButton);
  const navigate = useNavigate();

  const [date] = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split("T");

  const filteredJobs = jobs
    .filter((job) => {
      const [dueDate] = job.dueDate.split("T");
      return dueDate === date && !job.completed && !job.quoted;
    })
    .map((job) => {
      return job;
    });

  const collectedAndRedirect = (id) => {
    handleCollected(id);
    navigate("/dashBoard");
  };

  const completeAndRedirect = (id) => {
    handleComplete(id);
    navigate("/dashBoard");
  };

  return (
    <section className={search || !workButton ? "hidden" : "feed"}>
      <h3>Work Feed</h3>
      {filteredJobs[0] ? (
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
            {filteredJobs.map((job) => {
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
                    <button onClick={() => completeAndRedirect(job._id)}>
                      <MdDone />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => collectedAndRedirect(job._id)}>
                      <MdDone />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>All jobs are ready for tomorrow</p>
      )}
    </section>
  );
};

export default WorkFeed;
