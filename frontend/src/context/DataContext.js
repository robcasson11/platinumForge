import { createContext, useState, useEffect } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import api from "../api/jobs";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [editWorkRequired, setEditWorkRequired] = useState();
  const [editPrice, setEditPrice] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [smallScreen, setSmallScreen] = useState(false);
  const [workButton, setWorkButton] = useState(false);
  const [quoteButton, setQuoteButton] = useState(false);
  const [orderButton, setOrderButton] = useState(false);
  const [collectButton, setCollectButton] = useState(false);

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
      console.log(`Error with handle materials ordered : ${err}`);
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
      console.log(`Error with handle collected : ${err}`);
    }
  };

  const handleQuoted = async (_id) => {
    const toBeUpdatedJob = jobs.filter((job) => job._id === _id);
    toBeUpdatedJob[0].quoted = !toBeUpdatedJob[0].quoted;
    const data = toBeUpdatedJob[0];
    try {
      await api.patch("/jobs", data);
      setSearch("");
      setSearchResults([]);
    } catch (err) {
      console.log(`Error with handle quoted : ${err}`);
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
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        setSearchResults,
        smallScreen,
        setSmallScreen,
        jobs,
        setJobs,
        editPrice,
        setEditPrice,
        editWorkRequired,
        setEditWorkRequired,
        handleCollected,
        handleComplete,
        handleDelete,
        handleMaterialsOrdered,
        handleGoAhead,
        handleQuoted,
        handleEdit,
        workButton,
        setWorkButton,
        quoteButton,
        setQuoteButton,
        orderButton,
        setOrderButton,
        collectButton,
        setCollectButton,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
