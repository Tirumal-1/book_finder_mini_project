 import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Import styles below

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="overlay">
        <div className="dashboard-content">
          <h1 className="dashboard-title">Welcome to <span>Book Finder</span></h1>
          <div className="button-group">
            <button className="dashboard-btn" onClick={() => navigate("/explore")}>
              Explore Books
            </button>
            <button className="dashboard-btn" onClick={() => navigate("/search")}>
              Search Books
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
