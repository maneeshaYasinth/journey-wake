import React from "react";
import StartPage from "./components/StartPage/StartPage";
import MainMap from "./components/MainMap/MainMap";
import TurnOn from "./components/TurneOnLocation/TurnOn";
import MapNew from "./components/MapNew/MapNew";
import WakeUp from "./components/WakeUp/WakeUp";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import FrontMap from "./components/FrontMap/FrontMap";

const App = () => {
  return (
    
    <Router>
      
       {/* <Navbar/> */}
       {/* <StartPage />
      <TurnOn/>
      <MainMap/>
      <MapNew/>
      <WakeUp/> */}
   
 <div>
  <Routes>


<Route path="/currentPosition" exact element={ <FrontMap/>} />
<Route path="/wakeup" exact element={ <WakeUp/>} />
<Route path="/map" exact element={ <MapNew/>} />
<Route path="/turnOn" exact element={<TurnOn/>} />
<Route path="/" exact element={<StartPage />} />
  </Routes>
     
    </div>
   
    </Router>
   
  );
};

export default App;
