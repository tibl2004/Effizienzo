import React, { useState, useRef } from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Erfassen from './Erfassen/Erfassen';
import Auswahlkategorie from './AuswahlKategorie/AuswahlKategorie';
import Mainsite from './Mainsite/Mainsite';
import Navbar from './Navbar/Navbar';

function Navigation() {
  return <Navbar />;
}

function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navigation />
                <Mainsite />
              </>
            }
          />
          <Route
            path="/erfassen"
            element={
              <>
                <Navigation />
                <Erfassen />
              </>
            }
          />
          <Route
            path="/inserieren"
            element={
              <>
                <Navigation />
                <Auswahlkategorie />
              </>
            }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;


