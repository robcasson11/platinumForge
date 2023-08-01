import React from "react";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Link } from "react-router-dom";
import DevData from "../data/devData";
import api from "../api/jobs";

const MainContent = () => {
  const { search } = useContext(DataContext);

  const populateDatabase = async () => {
    clearDatabase();
    DevData.map(async (data) => {
      try {
        await api.post("/jobs", data);
      } catch (err) {
        console.log(`Error : ${err.message}`);
      }
    });
  };

  const clearDatabase = async () => {
    try {
      await api.delete("/jobs", {});
    } catch (err) {
      console.log(`Error with clear database : ${err}`);
    }
  };
  return (
    <div className="main-content">
      <p>Welcome</p>
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
