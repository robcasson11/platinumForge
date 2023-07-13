import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuotePage = ({
  jobs,
  handleEdit,
  setEditPrice,
  setEditWorkRequired,
  editWorkRequired,
  editPrice,
}) => {
  const { id } = useParams();
  const job = jobs.find((job) => job.id.toString() === id);
  const navigate = useNavigate();

  useEffect(() => {
    if (job) {
      setEditWorkRequired(job.workRequired);
      setEditPrice(job.price);
    }
  }, [job, setEditWorkRequired, setEditPrice]);

  const handleEditAndRedirect = (id) => {
    handleEdit(id);
    navigate("/");
  };

  return (
    <div className="job-page">
      <div className="job-page-body">
        <h3>{job.id}</h3>
        <h4>
          {job.fName} {job.lName}
        </h4>
        <p>
          <span>Quote details</span>
          <span>{job.quoteDetails}</span>
        </p>
      </div>
      <div className="job-page">
        <form onSubmit={(e) => e.preventDefault()}>
          <textarea
            id="workRequired"
            title="Work Required"
            value={editWorkRequired}
            onChange={(e) => setEditWorkRequired(e.target.value)}
          />
          <br />
          <input
            id="price"
            value={editPrice}
            type="number"
            onChange={(e) => setEditPrice(e.target.value)}
          />
          <button type="submit" onClick={() => handleEditAndRedirect(job._id)}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuotePage;
