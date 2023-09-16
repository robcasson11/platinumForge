import React from "react";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Link, useNavigate } from "react-router-dom";
import { MdDone } from "react-icons/md";

const OrdersFeed = () => {
  const { orderButton, search, jobs, handleMaterialsOrdered } =
    useContext(DataContext);

  const navigate = useNavigate();

  const [date] = new Date().toISOString().split("T");

  const ordersList = jobs
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
    navigate("/dashBoard");
  };

  return (
    <section className={search || !orderButton ? "hidden" : "feed"}>
      <h3>Jobs that need materials ordering</h3>
      {ordersList[0] ? (
        <table>
          <thead>
            <tr>
              <th>Job</th>
              <th>Materials To Order</th>
              <th>Supplier</th>
              <th>Ordered</th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((job) => {
              return (
                <tr key={job.id}>
                  <td>
                    <Link to={`jobPage/${job.id}`}>
                      <p>{job.id}</p>
                    </Link>
                  </td>
                  <td>
                    <Link to={`jobPage/${job.id}`}>
                      <p>{job.materialsNotes}</p>
                    </Link>
                  </td>
                  <td>
                    <Link to={`jobPage/${job.id}`}>
                      <p>{job.materialsSupplier}</p>
                    </Link>
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
