import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const JobPage = ({
  jobs,
  handleCollected,
  handleComplete,
  handleMaterialsOrdered,
  setSearch,
  handleDelete,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const job = jobs.find((job) => job.id.toString() === id);
  const date = new Date(Date.parse(job.dueDate));
  date.setDate(date.getDate());

  const dueDate = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const collectedAndRedirect = (id) => {
    handleCollected(id);
    navigate("/");
  };

  const materialsOrderedAndRedirect = (id) => {
    handleMaterialsOrdered(id);
    navigate("/");
  };

  const completedAndRedirect = (_id) => {
    handleComplete(_id);
    navigate("/");
  };

  console.log({ job });

  return (
    <main>
      {job && (
        <div className="job-page">
          <div className="job-page-body">
            <h3>{job.id}</h3>
            <h3 style={{ color: "red" }}>{job.quoteRequired && "QUOTE"}</h3>
            {job.quoteRequired && (
              <p>
                <span>Quote for</span> <span>{job.quoteDetails}</span>
              </p>
            )}
          </div>
          <div className="job-page-body">
            <h2>Customer Details</h2>
            <p>
              <span>First Name</span> <span>{job.fName}</span>
            </p>
            <p>
              <span>Last Name</span> <span>{job.lName}</span>
            </p>
            <p>
              <span>Phone Number</span> <span>{job.phoneNumber}</span>
            </p>
            {job.addressRequired && (
              <p>
                <span>Address</span> <span>{job.address}</span>
              </p>
            )}
          </div>
          <div className="job-page-body">
            <h2>Item Details</h2>
            <p>
              <span>Item</span> <span>{job.itemDescription}</span>
            </p>
            <p>
              <span>Work Required</span> <span>{job.workRequired}</span>
            </p>
            <p>
              <span>Price</span> <span>{job.price}</span>
            </p>
            {job.depositRequired && (
              <p>
                <span>Deposit</span> <span>{job.depositAmount}</span>
              </p>
            )}
            <p>
              <span>Due date</span> <span>{dueDate}</span>
            </p>
          </div>
          <div className="job-page-body">
            {job.materialsRequired && <h2>Order Materials</h2>}
            {job.materialsRequired && (
              <>
                <p>
                  <span>Supplier</span> <span>{job.materialsSupplier}</span>
                </p>{" "}
                <p>
                  <span>Materials</span> <span>{job.materialsNotes}</span>
                </p>
                <p>
                  <label htmlFor="materialsOrdered">Materials Ordered </label>
                  <input
                    name="materialsOrdered"
                    id="materialsOrdered"
                    title="Materials Ordered"
                    value={job.materialsOrdered}
                    type="checkBox"
                    checked={job.materialsOrdered}
                    onChange={() => materialsOrderedAndRedirect(job._id)}
                  ></input>
                </p>
              </>
            )}
          </div>
          <div className="job-page-body">
            {job.additionalNotesRequired && <h2>Extra Info</h2>}
            {job.additionalNotesRequired && (
              <p>
                <span>Notes</span> <span>{job.additionalNotes}</span>
              </p>
            )}
            {job.damagedRequired && (
              <p>
                <span>Damage</span> <span>{job.damagedNotes}</span>
              </p>
            )}
            <label htmlFor="completed">Completed </label>
            <input
              name="completed"
              id="completed"
              title="Completed"
              value={job.completed}
              type="checkBox"
              checked={job.completed}
              onChange={() => completedAndRedirect(job._id)}
            ></input>
            <br />
            <label htmlFor="collected">Collected </label>
            <input
              name="collected"
              id="collected"
              title="Collected"
              value={job.collected}
              type="checkBox"
              checked={job.collected}
              onChange={() => collectedAndRedirect(job._id)}
            ></input>
            {/* remove delete button after depoly. only needed for developement */}
            <br />
            <input
              type="checkBox"
              onChange={() => handleDelete(job._id)}
            ></input>
          </div>
          <br />
        </div>
      )}
      {!job && <h1>no job found</h1>}
      <Link to={"/"}>
        <button
          onClick={() => {
            setSearch("");
          }}
        >
          Home
        </button>
      </Link>
    </main>
  );
};

export default JobPage;
