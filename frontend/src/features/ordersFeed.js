import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDone } from "react-icons/md";

const OrdersFeed = ({ jobs, handleMaterialsOrdered }) => {
  const navigate = useNavigate();
  const [date] = new Date().toISOString().split("T");

  const quotesList = jobs
    .filter((job) => {
      return job.materialsRequired && job.materialsOrdered === false;
    })
    .map((job) => {
      const supplier = job.materialsSupplier.toLowerCase();
      let orderTimeScale = 0;
      if (supplier === "supplier1") {
        orderTimeScale = 3;
      }
      if (supplier === "supplier2") {
        orderTimeScale = 5;
      }
      const [dueDate] = new Date(
        new Date().setDate(new Date(job.dueDate).getDate())
      )
        .toISOString()
        .split("T");
      const [orderDate] = new Date(
        new Date().setDate(new Date(job.dueDate).getDate() - orderTimeScale)
      )
        .toISOString()
        .split("T");
      const newJob = { ...job, date, dueDate, orderDate };
      return newJob;
    })
    .filter((job) => {
      return job.orderDate === date;
    });

  const materialsOrderedAndRedirect = (id) => {
    handleMaterialsOrdered(id);
    navigate("/");
  };

  return (
    <section className="quotes-feed">
      <h3>Orders Feed</h3>
      {quotesList[0] ? (
        <table>
          <thead>
            <tr>
              <th>Job</th>
              <th>Customer Name</th>
              <th>Materials To Order</th>
              <th>Supplier</th>
              <th>Ordered</th>
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
                    <p>{job.materialsNotes}</p>
                  </td>
                  <td>
                    <p>{job.materialsSupplier}</p>
                  </td>
                  <td>
                    <button
                      onClick={() => materialsOrderedAndRedirect(job._id)}
                    >
                      <MdDone />
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
