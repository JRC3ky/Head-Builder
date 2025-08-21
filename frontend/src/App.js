import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FaceBuilderApp from "./components/FaceBuilderApp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FaceBuilderApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;