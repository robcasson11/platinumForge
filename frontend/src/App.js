import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./features/layout";
import HomePage from "./features/homePage";
import Form from "./features/form/Form";
import JobPage from "./features/jobPage";
import QuotePage from "./features/quotePage";
import MainContent from "./features/mainContent";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="form" element={<Form />} />
        <Route path="dashBoard" element={<Layout />}>
          <Route index element={<MainContent />} />
          <Route path="jobPage">
            <Route path=":id" element={<JobPage />} />
          </Route>
          <Route path="quotePage">
            <Route path=":id" element={<QuotePage />} />
          </Route>
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
