import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from "@react-google-maps/api";
import { getDistance } from 'geolib';

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 6.9271, // Default center, can be set to the user's initial location
  lng: 79.8612,
};

const MapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBST9IE1oYAtjIM6-uJnqq_IgPe4wA8hkQ", // Make sure to replace this with your actual API key
  });

  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [destination, setDestination] = useState(null);
  const [alertDistance, setAlertDistance] = useState(1000); // default alert distance in meters
  const [distance, setDistance] = useState(null);

  const handleLoad = map => setMap(map);
  const handleUnmount = () => setMap(null);

  const handleMapClick = (e) => {
    setDestination({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const handleDistanceChange = (e) => {
    setAlertDistance(e.target.value);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
    if (currentPosition && destination) {
      const distance = getDistance(currentPosition, destination);
      setDistance(distance);
      if (distance <= alertDistance) {
        alert("You are approaching your destination!");
      }
    }
  }, [currentPosition, destination, alertDistance]);

  return isLoaded ? (
    <div>
      <h1>Transit Buddy</h1>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition.lat !== 0 ? currentPosition : center}
        zoom={12}
        onLoad={handleLoad}
        onUnmount={handleUnmount}
        onClick={handleMapClick}
      >
        {currentPosition && (
          <Marker position={currentPosition} label="You" />
        )}
        {destination && (
          <Marker position={destination} label="Destination" />
        )}
      </GoogleMap>
      <div className="distance-selector">
        <label>
          Set alert distance (meters):
          <input type="number" value={alertDistance} onChange={handleDistanceChange} />
        </label>
      </div>
      <div>
        <p>Your Current Position:</p>
        <p>Latitude: {currentPosition.lat}</p>
        <p>Longitude: {currentPosition.lng}</p>
      </div>
      {destination && (
        <div>
          <p>Destination:</p>
          <p>Latitude: {destination.lat}</p>
          <p>Longitude: {destination.lng}</p>
        </div>
      )}
      {distance && (
        <div>
          <p>Distance to destination: {distance} meters</p>
        </div>
      )}
    </div>
  ) : <></>;
};

export default MapComponent;
