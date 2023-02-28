import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <AuthProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  //</AuthProvider>
);
