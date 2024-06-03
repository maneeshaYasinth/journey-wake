import React from "react";
import StartPage from "./components/StartPage/StartPage";
import MainMap from "./components/MainMap/MainMap";
import TurnOn from "./components/TurneOnLocation/TurnOn";
import MapNew from "./components/MapNew/MapNew";


const App = () => {
  return (
    <div>
      <StartPage />
      {/* <TurnOn/> */}
      {/* <MainMap/> */}
      <MapNew/>
   
    </div>
  );
};

export default App;
