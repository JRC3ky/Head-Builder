import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnhancedFaceBuilderApp from "./components/EnhancedFaceBuilderApp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnhancedFaceBuilderApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;