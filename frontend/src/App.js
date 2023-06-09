import { useState, useEffect } from "react";
import React from "react";
import api from "./api/jobs";
import Form from "./features/Form";
import Home from "./features/Home";

function App() {
  const [jobs, setJobs] = useState();

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
  }, []);

  return (
    <div>
      <Form />
      <Home jobs={jobs} />
    </div>
  );
}

export default App;
