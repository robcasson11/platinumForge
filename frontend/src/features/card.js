import React from "react";
import { Link } from "react-router-dom";

const Card = ({ job }) => {
  return (
    <li className="card">
      <h4>{job.id}</h4>
      <p>{job.fName}</p>
      <p>{job.lName}</p>
      <p>{job.itemDescription}</p>
      <Link to={`/jobPage/${job.id}`}>
        <button>View Job</button>
      </Link>
      {job.completed ? <p>completed</p> : <p>not completed</p>}
      <br />
    </li>
  );
};

export default Card;
