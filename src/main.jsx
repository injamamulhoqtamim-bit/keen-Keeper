import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes"; // 👈 routes/index.jsx
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);