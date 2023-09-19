import React, { useState, useRef } from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Erfassen from './Erfassen/Erfassen';
import Auswahlkategorie from './AuswahlKategorie/AuswahlKategorie';
import Mainsite from './Mainsite/Mainsite';
import Navbar from './Navbar/Navbar';


import Kleidung from './InserierenVorlagen/Kleidung';
import Schuhe from './InserierenVorlagen/Schuhe';
import Bastelartikel from './InserierenVorlagen/Bastelartikel';
import Briefmarken from './InserierenVorlagen/Briefmarken';
import DVDBluRayPlayer from './InserierenVorlagen/DVDBlueRayPlayer';
import Buecher from './InserierenVorlagen/Buecher';
import Druckerzubehoer from './InserierenVorlagen/Druckerzubehoer';
import Geschirr from './InserierenVorlagen/Geschirr';
import Kopfhoerer from './InserierenVorlagen/Kopfhoerer';
import Reaktivierung from './Reaktivierung/Reaktivierung';

function Navigation() {
  return <Navbar />;
}

function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/Effizienzo"
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
            path="/reaktivierung"
            element={
              <>
                <Navigation />
                <Reaktivierung />
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
          <Route
            path="/bastelartikel"
            element={
              <>
                <Navigation />
                <Bastelartikel />
              </>
            }
          />
            { /*
          <Route
            path="/bilder"
            element={
              <>
                <Navigation />
                <Bilder />
              </>
            }
          />
        
          <Route
            path="/brautkleid"
            element={
              <>
                <Navigation />
                <Brautkleid />
              </>
            }
          /> */}
          <Route
            path="/briefmarken"
            element={
              <>
                <Navigation />
                <Briefmarken />
              </>
            }
          />
         
          <Route
            path="/buecher"
            element={
              <>
                <Navigation />
                <Buecher />
              </>
            }
          />
           {/* 
          <Route
            path="/drucker"
            element={
              <>
                <Navigation />
                <Drucker />
              </>
            }
          />*/}
          <Route
            path="/druckerzubehoer"
            element={
              <>
                <Navigation />
                <Druckerzubehoer />
              </>
            }
          /> 
          <Route
            path="/dvd"
            element={
              <>
                <Navigation />
                <DVDBluRayPlayer />
              </>
            }
          /> 
          {/*
          <Route
            path="/fahrrad-shorts"
            element={
              <>
                <Navigation />
                <FahrradShorts />
              </>
            }
          />
          <Route
            path="/games"
            element={
              <>
                <Navigation />
                <Games />
              </>
            }
          /> */} 
          <Route
            path="/geschirr"
            element={
              <>
                <Navigation />
                <Geschirr />
              </>
            }
          /> {/*
          <Route
            path="/druckerpatronen"
            element={
              <>
                <Navigation />
                <Kleidung />
              </>
            }
          />
          <Route
            path="/kaffeemaschine"
            element={
              <>
                <Navigation />
                <Kaffeemaschine />
              </>
            }
          />
          <Route
            path="/kerzenstaender"
            element={
              <>
                <Navigation />
                <Kerzenstaender />
              </>
            }
          /> */}
          <Route
            path="/kleidung"
            element={
              <>
                <Navigation />
                <Kleidung />
              </>
            }
          />
          {/*
          <Route
            path="/kopfbedeckungen"
            element={
              <>
                <Navigation />
                <Kopfbedeckungen />
              </>
            }
          /> */}
         
          <Route
            path="/kopfhoerer"
            element={
              <>
                <Navigation />
                <Kopfhoerer />
              </>
            }
          />
           {/*
          <Route
            path="/kopfkissen"
            element={
              <>
                <Navigation />
                <Kopfkissen />
              </>
            }
          />
          <Route
            path="/migros-sprayer"
            element={
              <>
                <Navigation />
                <MigrosSprayer />
              </>
            }
          />
          <Route
            path="/moebel"
            element={
              <>
                <Navigation />
                <Moebel />
              </>
            }
          />
          <Route
            path="/modelleisenbahnen"
            element={
              <>
                <Navigation />
                <Modelleisenbahnen />
              </>
            }
          />
          <Route
            path="/monitore"
            element={
              <>
                <Navigation />
                <Monitore />
              </>
            }
          />
          <Route
            path="/musikinstrumente"
            element={
              <>
                <Navigation />
                <Musikinstrumente />
              </>
            }
          />
          <Route
            path="/lcd-projektor"
            element={
              <>
                <Navigation />
                <LCDProjektor />
              </>
            }
          />
          <Route
            path="/plueschtiere"
            element={
              <>
                <Navigation />
                <Plueschtiere />
              </>
            }
          />
          <Route
            path="/portemonnaie"
            element={
              <>
                <Navigation />
                <Portemonnaie />
              </>
            }
          />
          <Route
            path="/schallplatten"
            element={
              <>
                <Navigation />
                <Schallplatten />
              </>
            }
          />
          <Route
            path="/schmuck"
            element={
              <>
                <Navigation />
                <Schmuck />
              </>
            }
          />
          <Route
            path="/schuhe"
            element={
              <>
                <Navigation />
                <Schuhe />
              </>
            }
          />
          <Route
            path="/schutzhuellen-smartphone"
            element={
              <>
                <Navigation />
                <Schutzhuellen />
              </>
            }
          />

          <Route
            path="/skulpturen-figuren"
            element={
              <>
                <Navigation />
                <Figuren />
              </>
            }
          />
          <Route
            path="/spiele"
            element={
              <>
                <Navigation />
                <Spiele />
              </>
            }
          />
          <Route
            path="/steinschmuck-marus"
            element={
              <>
                <Navigation />
                <SteinschmuckMarus />
              </>
            }
          />
          <Route
            path="/tasche-rucksack"
            element={
              <>
                <Navigation />
                <Tasche />
              </>
            }
          />
          <Route
            path="/tastatur"
            element={
              <>
                <Navigation />
                <Tastatur />
              </>
            }
          />
          <Route
            path="/vasen"
            element={
              <>
                <Navigation />
                <Vasen />
              </>
            }
          />
          <Route
            path="/wanduhren-standuhren"
            element={
              <>
                <Navigation />
                <Wanduhren />
              </>
            }
          />
          <Route
            path="/werkzeug"
            element={
              <>
                <Navigation />
                <Werkzeug />
              </>
            }
          />
          */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;


