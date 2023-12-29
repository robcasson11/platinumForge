import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";

const HomePage = () => {
  const { clearDatabase } = useContext(DataContext);
  clearDatabase();
  return (
    <div className="home-page">
      <Link className="btn" to={`/form`}>
        <button type="button" className="new-item-btn">
          Add New Item
        </button>
      </Link>

      <Link className="btn" to={`/dashBoard`}>
        <button type="button" className="dash-board-btn">
          Dashboard
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
