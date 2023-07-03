import { useState, useEffect } from "react";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import api from "./api/jobs";
import Form from "./features/form/Form";
import Home from "./features/Home";
import JobPage from "./features/jobPage";

function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");
        setJobs(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err);
        } else {
          console.log`Robs error: ${err.message}`;
        }
      }
    };
    fetchJobs();
  }, [location]);

  useEffect(() => {
    const filteredResults = jobs.filter(
      (job) =>
        job.itemDescription.toLowerCase().includes(search.toLowerCase()) ||
        job.lName.toLowerCase().includes(search.toLowerCase()) ||
        job.fName.toLowerCase().includes(search.toLowerCase()) ||
        job.id.toString().includes(search.toString())
    );
    setSearchResults(filteredResults.reverse());
  }, [jobs, search]);

  const handleComplete = async (_id) => {
    console.log("clicked");
    const toBeUpdatedJob = jobs.filter((job) => job._id === _id);
    toBeUpdatedJob[0].completed = !toBeUpdatedJob[0].completed;
    const data = toBeUpdatedJob[0];
    console.log(data);
    try {
      await api.patch("/jobs", data);
      setSearch("");
      setSearchResults([]);
    } catch (err) {
      console.log(`Error with handle complete : ${err}`);
    }
  };

  const handleMaterialsOrdered = async (_id) => {
    console.log("clicked");
    const toBeUpdatedJob = jobs.filter((job) => job._id === _id);
    toBeUpdatedJob[0].materialsOrdered = !toBeUpdatedJob[0].materialsOrdered;
    const data = toBeUpdatedJob[0];
    console.log(data);
    try {
      await api.patch("/jobs", data);
      setSearch("");
      setSearchResults([]);
    } catch (err) {
      console.log(`Error with handle complete : ${err}`);
    }
  };

  const handleCollected = async (_id) => {
    console.log("clicked");
    const toBeUpdatedJob = jobs.filter((job) => job._id === _id);
    toBeUpdatedJob[0].collected = !toBeUpdatedJob[0].collected;
    const data = toBeUpdatedJob[0];
    console.log(data);
    try {
      await api.patch("/jobs", data);
      setSearch("");
      setSearchResults([]);
    } catch (err) {
      console.log(`Error with handle complete : ${err}`);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await api.delete("/jobs", { data: { _id: _id } });
      setSearch("");
      setSearchResults([]);
    } catch (err) {
      console.log(`Error with handle delete : ${err}`);
    } finally {
      const jobsList = jobs.filter((job) => job._id !== _id);
      setJobs(jobsList);
    }
  };

  return (
    <Routes>
      <Route
        index
        element={
          <Home
            jobs={jobs}
            search={search}
            setSearch={setSearch}
            searchResults={searchResults}
            handleCollected={handleCollected}
            handleComplete={handleComplete}
          />
        }
      />
      <Route path="form" element={<Form />} />
      <Route path="jobPage">
        <Route
          path=":id"
          element={
            <JobPage
              jobs={jobs}
              setJobs={setJobs}
              setSearch={setSearch}
              setSearchResults={setSearchResults}
              handleCollected={handleCollected}
              handleComplete={handleComplete}
              handleMaterialsOrdered={handleMaterialsOrdered}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
