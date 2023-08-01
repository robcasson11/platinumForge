import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const QuotePage = ({
  jobs,
  handleEdit,
  setSearch,
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
    navigate("/dashBoard");
  };

  return (
    <div className="quote-page main-content">
      <h3>{job.id}</h3>
      <div className="main-content-table">
        <p>Name</p>
        <h4>
          {job.fName} {job.lName}
        </h4>
        <p>Item</p>
        <h4> {job.itemDescription}</h4>
        <p>Quote details:</p>
        <h4>{job.quoteDetails}</h4>
        <form
          style={{ display: "contents" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <p>Work Required</p>
          <textarea
            id="workRequired"
            title="Work Required"
            value={editWorkRequired}
            onChange={(e) => setEditWorkRequired(e.target.value)}
          />
          <p>Estimated Cost</p>
          <input
            id="price"
            value={editPrice}
            type="number"
            onChange={(e) => setEditPrice(e.target.value)}
          />
          <div></div>
          <div className="main-content-buttons">
            <button
              type="submit"
              onClick={() => handleEditAndRedirect(job._id)}
            >
              Submit
            </button>
            <Link to={"/dashBoard"}>
              <button
                onClick={() => {
                  setSearch("");
                }}
              >
                Close
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuotePage;
