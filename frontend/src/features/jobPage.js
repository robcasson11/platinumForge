import React, { useEffect } from "react";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useParams, useNavigate, Link } from "react-router-dom";

const JobPage = () => {
  const {
    jobs,
    handleCollected,
    handleComplete,
    handleMaterialsOrdered,
    handleQuoted,
    setSearch,
    setSmallScreen,
  } = useContext(DataContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const job = jobs.find((job) => job.id.toString() === id);

  useEffect(() => {
    setSmallScreen(true);
    setSearch("");
  });

  if (!job) {
    return <div>Loading...</div>;
  }
  const date = new Date(Date.parse(job.dueDate));
  date.setDate(date.getDate());

  const dueDate = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const collectedAndRedirect = (id) => {
    handleCollected(id);
    navigate("/dashBoard");
  };

  const materialsOrderedAndRedirect = (id) => {
    handleMaterialsOrdered(id);
    navigate("/dashBoard");
  };

  const completedAndRedirect = (_id) => {
    handleComplete(_id);
    navigate("/dashBoard");
  };

  const quoteAndRedirect = (_id) => {
    handleQuoted(_id);
    navigate("/dashBoard");
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main-content">
      {job && (
        <div className="job-page">
          <Link className="close-button" reloadDocument to={"/dashBoard"}>
            <button
              onClick={() => {
                setSearch("");
              }}
            >
              Close
            </button>
          </Link>
          <h3>{job.id}</h3>
          <div className="main-content-buttons">
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
            <label htmlFor="quoted">Quoted </label>
            <input
              name="quoted"
              id="quoted"
              title="Quoted"
              value={job.quoted}
              type="checkBox"
              checked={job.quoted}
              onChange={() => quoteAndRedirect(job._id)}
            ></input>
          </div>
          <h3 style={{ color: "red" }}>{job.quoteRequired && "QUOTE"}</h3>
          <div className="main-content-table">
            <p>First Name</p> <h4>{job.fName}</h4>
            <p>Last Name</p> <h4>{job.lName}</h4>
            <p>Phone Number</p> <h4>{job.phoneNumber}</h4>
            {job.addressRequired && <p>Address</p>}
            {job.addressRequired && <h4>{job.address}</h4>}
            <p>Item</p>
            <h4>{job.itemDescription}</h4>
            <p>Work Required</p>
            <h4>{job.workRequired}</h4>
            {job.quoteRequired && <p>Quote for</p>}
            {job.quoteRequired && <h4>{job.quoteDetails}</h4>}
            <p>Price</p>
            <h4>{job.price}</h4>
            {job.depositRequired && <p>Deposit</p>}
            {job.depositRequired && <h4>{job.depositAmount}</h4>}
            <p>Due date</p>
            <h4>{dueDate}</h4>
            {job.materialsRequired && (
              <>
                <p>Supplier</p>
                <h4>{job.materialsSupplier}</h4>
                <p>Materials</p>
                <h4>{job.materialsNotes}</h4>
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
              </>
            )}
            {job.additionalNotesRequired && <p>Notes</p>}
            {job.additionalNotesRequired && <h4>{job.additionalNotes}</h4>}
            {job.damagedRequired && <p>Damage</p>}
            {job.damagedRequired && <h4>{job.damagedNotes}</h4>}
            {/* remove delete button after depoly. only needed for developement */}
          </div>
        </div>
      )}
      {!job && <h1>no job found</h1>}
    </main>
  );
};

export default JobPage;
