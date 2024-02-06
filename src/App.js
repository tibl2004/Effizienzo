import React, { useState, useRef, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Erfassen from './Erfassen/Erfassen';
import Auswahlkategorie from './AuswahlKategorie/AuswahlKategorie';
import Mainsite from './Mainsite/Mainsite';
import Navbar from './Navbar/Navbar';
import Tagesplanung from './Admin/Tagesplanung';




import WandStandUhren from './InserierenVorlagen/WandStandUhren';
import Werkzeug from './InserierenVorlagen/Werkzeug';
import Portemonnaie from './InserierenVorlagen/Portemonnaie';
import Schallplatten from './InserierenVorlagen/Schallplatten';
import Plueschtiere from './InserierenVorlagen/Plueschtiere';
import Musikinstrumente from './InserierenVorlagen/Musikinstrumente';
import Monitore from './InserierenVorlagen/Monitore';
import MigrosSprayer from './InserierenVorlagen/MigrosSprayer';
import Kopfkissen from './InserierenVorlagen/Kopfkissen';
import Kaffeemaschine from './InserierenVorlagen/Kaffeemaschine';
import Games from './InserierenVorlagen/Games';
import Drucker from './InserierenVorlagen/Drucker';
import Kleidung from './InserierenVorlagen/Kleidung';
import Schuhe from './InserierenVorlagen/Schuhe';
import Bastelartikel from './InserierenVorlagen/Bastelartikel';
import Briefmarken from './InserierenVorlagen/Briefmarken';
import DVDBluRayPlayer from './InserierenVorlagen/DVDBlueRayPlayer';
import Buecher from './InserierenVorlagen/Buecher';
import Druckerzubehoer from './InserierenVorlagen/Druckerzubehoer';
import Geschirr from './InserierenVorlagen/Geschirr';
import Kopfhoerer from './InserierenVorlagen/Kopfhoerer';
import Spiele from './InserierenVorlagen/Spiele';
import SchutzhuellenFuerSmartphone from './InserierenVorlagen/SchutzhuellenFuerSmartphone';
import Bilder from './InserierenVorlagen/Bilder';
import Kopfbedeckungen from './InserierenVorlagen/Kopfbedeckung';
import Moebel from './InserierenVorlagen/Moebel';
import Kerzenstaender from './InserierenVorlagen/Kerzenstaender';
import Brautkleid from './InserierenVorlagen/Brautkleid';
import FahrradShorts from './InserierenVorlagen/FahrradShorts';

import Reaktivierung from './Reaktivierung/Reaktivierung';


import Login from './Login/Login';
import Admins from './Admin/Admins';
import BuchungsbelegVerkauf from './Admin/BuchungsbelegVerkauf';


import Versand from './Versand/Versand';

import Users from './Admin/Users/Users';

import Main from 'react-router-dom/dist/main';
import Vasen from './InserierenVorlagen/Vasen';
import Profil from './Profil/Profil';
import Settings from './Settings/Settings';



import FAQ from './Fragen/Fragen';
import CreateUser from './Admin/CreateUser';
import LogComponent from './Logs/LogComponent';
import Kassabuch from './Kasse/Kassabuch';
import FeedbackView from './Admin/Feedbacks/FeedbackView';



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
               <Navbar />
                <Mainsite />
              </>
            }
          />
          <Route
            path="/profil"
            element={
              <>
                <Navbar />
                <Profil />
              </>
            }
          />

<Route
            path="/feedback"
            element={
              <>
                <Navbar />
                <FeedbackView />
              </>
            }
          />

<Route
            path="/kassabuch"
            element={
              <>
                <Navbar />
                < Kassabuch/>
              </>
            }
          />


<Route
            path="/logs"
            element={
              <>
                <Navigation />
                <LogComponent />
              </>
            }
          />

          <Route
            path="/profil/settings"
            element={
              <>
                <Navbar />
                <Settings />
              </>
            }
          />


          





          
          <Route
            path="/admins/users"
            element={
              <>
                <Navigation />
                <Users />
              </>
            }
          />

          
          <Route
            path="/mainsite"
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
            path="/versand"
            element={
              <>
                <Navigation />
                <Versand />
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
            path="/erfassen"
            element={
              <>
                <Navigation />
                <Erfassen />
              </>
            }
          />

          <Route
            path="/kategorien"
            element={
              <>
                <Navigation />
                <Auswahlkategorie />
              </>
            }
          />
       


          <Route
            path="/admins"
            element={
              <>
                <Navigation />
                <Admins />
              </>
            }
          />



          <Route
            path="/admins/interner-verkauf"
            element={
              <>
                <Navigation />
                <BuchungsbelegVerkauf />
              </>
            }
          />
          <Route
            path="/admins/usercreate"
            element={
              <>
                <Navigation />
                <CreateUser />
              </>
            }
          />
    

        <Route
            path="/faq"
            element={
              <>
                <Navigation />
                <FAQ />
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
            path="/vasen"
            element={
              <>
                <Navigation />
                <Vasen />
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
          />
          <Route
            path="/fahrradshorts"
            element={
              <>
                <Navigation />
                <FahrradShorts />
              </>
            }
          />

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

          <Route
            path="/drucker"
            element={
              <>
                <Navigation />
                <Drucker />
              </>
            }
          />
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
          />
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
            />*/}
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
          />
          <Route
            path="/kleidung"
            element={
              <>
                <Navigation />
                <Kleidung />
              </>
            }
          />

          <Route
            path="/kopfbedeckungen"
            element={
              <>
                <Navigation />
                <Kopfbedeckungen />
              </>
            }
          />

          <Route
            path="/kopfhoerer"
            element={
              <>
                <Navigation />
                <Kopfhoerer />
              </>
            }
          />

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
            path="/migrossprayer"
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
          /> {/*
            <Route
              path="/modelleisenbahnen"
              element={
                <>
                  <Navigation />
                  <Modelleisenbahnen />
                </>
              }
            /> */}
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
          />{/*
            <Route
              path="/lcd-projektor"
              element={
                <>
                  <Navigation />
                  <LCDProjektor />
                </>
              }
            /> */}
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
          /> {/*
            <Route
              path="/schmuck"
              element={
                <>
                  <Navigation />
                  <Schmuck />
                </>
              }
            /> */}
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
            path="/schutzhuellensmartphone"
            element={
              <>
                <Navigation />
                <SchutzhuellenFuerSmartphone />
              </>
            }
          />
          {/*

            <Route
              path="/skulpturen-figuren"
              element={
                <>
                  <Navigation />
                  <Figuren />
                </>
              }
            />
            */}
          <Route
            path="/spiele"
            element={
              <>
                <Navigation />
                <Spiele />
              </>
            }
          />
          {/*
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
            />*/}
          <Route
            path="/wandstanduhren"
            element={
              <>
                <Navigation />
                <WandStandUhren />
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

        </Routes>
      </Router>
    </div>
  );
}

export default App;


