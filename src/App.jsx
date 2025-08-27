import React from "react";
import './styles.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ExploreBooks from "./pages/ExploreBooks";
import SearchBooks from "./pages/SearchBooks";
import BookDetails from "./pages/BookDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/explore" element={<ExploreBooks />} />
        <Route path="/search" element={<SearchBooks />} />
        <Route path="/book/:key" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}
