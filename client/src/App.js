import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import Knowledge from "./pages/knowledge/Knowledge";
import Know from "./pages/knowledge/Know";

function App() {
  return (
    <div className="App">
      <Knowledge />
      <hr />
      <Know />
    </div>
  );
}

export default App;
