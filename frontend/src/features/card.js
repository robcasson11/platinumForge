import React from "react";
import { Link } from "react-router-dom";

const Card = ({ job }) => {
  return (
    <div className="card">
      <div className="card-left">
        <h2>{job.id}</h2>
        <p>{job.fName}</p>
        <h3>{job.lName}</h3>
      </div>
      <div className="card-right">
        <p>{job.itemDescription}</p>
        {job.quoteRequired && <h2>Quote</h2>}
        {job.materialsRequired && <h2>Order</h2>}
        {job.completed && <h2>Completed</h2>}
        <div className="card-nav">
          <Link to={`jobPage/${job.id}`}>
            <button>View Job</button>
          </Link>
          <Link to={`quotePage/${job.id}`}>
            <button>Quote/Order Materials</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
