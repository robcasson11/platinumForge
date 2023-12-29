import React from "react";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Link, useNavigate } from "react-router-dom";
import DevData from "../data/devData";
import api from "../api/jobs";

const MainContent = () => {
  const { search, clearDatabase } = useContext(DataContext);

  const navigate = useNavigate();

  const populateDatabase = async () => {
    DevData.map(async (data) => {
      try {
        await api.post("/jobs", data);
        console.log(data);
      } catch (err) {
        console.log(`Error : ${err.message}`);
      }
    });
    navigate("/dashBoard");
  };

  return (
    <div className="main-content">
      <div className={search ? "hidden" : "devButtons"}>
        <button className="button">
          <span>
            <Link to={`/form`}>Add New Item</Link>
          </span>
        </button>
        <p style={{ color: "red" }}>DEV BUTTONS</p>
        <button
          className="button"
          onClick={() => {
            populateDatabase();
          }}
        >
          <span>Populate database</span>
        </button>
        <button
          className="button"
          onClick={() => {
            clearDatabase();
          }}
        >
          <span>Clear database</span>
        </button>
      </div>
    </div>
  );
};

export default MainContent;
