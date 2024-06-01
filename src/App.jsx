import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Notification from './components/Notification';
import DistanceCalculator from './components/DistanceCalculator';

function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleMapClick = (e) => {
    setEndLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error retrieving location", error);
          alert('Error: The Geolocation service failed.');
        }
      );
    } else {
      alert('Error: Your browser doesn\'t support geolocation.');
    }
  }, []);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-4">Transit Buddy</h1>
      <Map
        center={currentLocation || { lat: -3.745, lng: -38.523 }}
        onClick={handleMapClick}
        currentLocation={currentLocation}
        endLocation={endLocation}
      />
      <DistanceCalculator
        currentLocation={currentLocation}
        endLocation={endLocation}
        setNotificationMessage={setNotificationMessage}
      />
      <Notification message={notificationMessage} />
      {currentLocation && (
        <div>
          <p>Your Current Position:</p>
          <p>Latitude: {currentLocation.lat}</p>
          <p>Longitude: {currentLocation.lng}</p>
        </div>
      )}
      {endLocation && (
        <div>
          <p>Your End Position:</p>
          <p>Latitude: {endLocation.lat}</p>
          <p>Longitude: {endLocation.lng}</p>
        </div>
      )}
    </div>
  );
}

export default App;
