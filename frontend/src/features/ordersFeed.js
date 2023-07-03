import React from "react";
import { Link, useNavigate } from "react-router-dom";

const OrdersFeed = ({ jobs, handleDelete, handleComplete }) => {
  const navigate = useNavigate();
  const [date] = new Date().toISOString().split("T");

  const ordersList = jobs
    .filter((job) => {
      const supplier = job.materialsSupplier.toLowerCase();
      let orderTimeScale = 0;
      if (supplier === "supplier1") {
        orderTimeScale = 2;
      }
      if (supplier === "supplier2") {
        orderTimeScale = 4;
      }
      const [orderDate] = new Date(
        new Date().setDate(new Date(job.dueDate).getDate() - orderTimeScale)
      )
        .toISOString()
        .split("T");
      return date === orderDate && job.materialsRequired;
    })
    .map((job) => {
      return job;
    });

  const deleteAndRedirect = (id) => {
    handleDelete(id);
    navigate("/");
  };

  const checkAndRedirect = (id) => {
    handleComplete(id);
    navigate("/");
  };

  return (
    <section className="quotes-feed">
      {ordersList[0] ? (
        <table>
          <thead>
            <tr>
              <th>Job</th>
              <th>Customer Name</th>
              <th>Due Date</th>
              <th>Completed</th>
              <th>Collected</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((job) => {
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
                    <input
                      name="completed"
                      title="Completed"
                      value={job.completed}
                      type="checkBox"
                      checked={job.completed}
                      onChange={() => checkAndRedirect(job._id)}
                    ></input>
                  </td>
                  <td>
                    <button onClick={() => deleteAndRedirect(job._id)}>
                      delete job
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No Orders</p>
      )}
    </section>
  );
};

export default OrdersFeed;
