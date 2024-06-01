import React, { useState, useEffect } from 'react';

function LocationTracker({ setCurrentLocation }) {
  const [position, setPosition] = useState({});

  const success = (pos) => {
    const crd = pos.coords;
    setPosition({
      latitude: crd.latitude,
      longitude: crd.longitude,
    });
    setCurrentLocation({
      lat: crd.latitude,
      lng: crd.longitude,
    });
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <div>
      <h2>Your Current Position:</h2>
      <p>Latitude: {position.latitude}</p>
      <p>Longitude: {position.longitude}</p>
    </div>
  );
}

export default LocationTracker;
