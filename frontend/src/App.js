import { useState, useEffect } from "react";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import api from "./api/jobs";
import HomePage from "./features/homePage";
import Form from "./features/form/Form";
import JobPage from "./features/jobPage";
import QuotePage from "./features/quotePage";
import DashBoard from "./features/dashBoard";

function App() {
  const [jobs, setJobs] = useState([]);
  const [editWorkRequired, setEditWorkRequired] = useState();
  const [editPrice, setEditPrice] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");
        setJobs(response.data);
      } catch (err) {
        if (err.response.status === 400) {
          return;
        }
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
    const toBeUpdatedJob = jobs.filter((job) => job._id === _id);
    toBeUpdatedJob[0].completed = !toBeUpdatedJob[0].completed;
    const data = toBeUpdatedJob[0];
    try {
      await api.patch("/jobs", data);
      setSearch("");
      setSearchResults([]);
    } catch (err) {
      console.log(`Error with handle complete : ${err}`);
    }
  };

  const handleMaterialsOrdered = async (_id) => {
    const toBeUpdatedJob = jobs.filter((job) => job._id === _id);
    toBeUpdatedJob[0].materialsOrdered = !toBeUpdatedJob[0].materialsOrdered;
    const data = toBeUpdatedJob[0];
    try {
      await api.patch("/jobs", data);
      setSearch("");
      setSearchResults([]);
    } catch (err) {
      console.log(`Error with handle complete : ${err}`);
    }
  };

  const handleCollected = async (_id) => {
    const toBeUpdatedJob = jobs.filter((job) => job._id === _id);
    toBeUpdatedJob[0].collected = !toBeUpdatedJob[0].collected;
    const data = toBeUpdatedJob[0];
    try {
      await api.patch("/jobs", data);
      setSearch("");
      setSearchResults([]);
    } catch (err) {
      console.log(`Error with handle complete : ${err}`);
    }
  };

  // Handle delete is only used in development... romeve before deploying
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

  const handleEdit = async (_id) => {
    const toBeUpdatedJob = jobs.filter((job) => job._id === _id);
    toBeUpdatedJob[0].workRequired = editWorkRequired;
    toBeUpdatedJob[0].price = editPrice;
    toBeUpdatedJob[0].quoted = true;
    const data = toBeUpdatedJob[0];
    try {
      await api.patch("/jobs", data);
      setSearch("");
      setSearchResults([]);
    } catch (err) {
      console.log(`Error with handle edit : ${err}`);
    }
  };

  const handleGoAhead = async (_id) => {
    const toBeUpdatedJob = jobs.filter((job) => job._id === _id);
    toBeUpdatedJob[0].quoteRequired = false;
    const data = toBeUpdatedJob[0];
    try {
      await api.patch("/jobs", data);
      setSearch("");
      setSearchResults([]);
    } catch (err) {
      console.log(`Error with handle edit : ${err}`);
    }
  };

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="dashBoard"
        element={
          <DashBoard
            jobs={jobs}
            setJobs={setJobs}
            search={search}
            setSearch={setSearch}
            searchResults={searchResults}
            handleCollected={handleCollected}
            handleComplete={handleComplete}
            handleMaterialsOrdered={handleMaterialsOrdered}
            handleGoAhead={handleGoAhead}
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
              handleDelete={handleDelete}
              handleMaterialsOrdered={handleMaterialsOrdered}
            />
          }
        />
      </Route>
      <Route path="quotePage">
        <Route
          path=":id"
          element={
            <QuotePage
              jobs={jobs}
              setJobs={setJobs}
              setSearch={setSearch}
              setSearchResults={setSearchResults}
              handleCollected={handleCollected}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
              handleMaterialsOrdered={handleMaterialsOrdered}
              handleEdit={handleEdit}
              editPrice={editPrice}
              editWorkRequired={editWorkRequired}
              setEditPrice={setEditPrice}
              setEditWorkRequired={setEditWorkRequired}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
