import React from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const Map = ({ center, onClick, currentLocation, endLocation }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBST9IE1oYAtjIM6-uJnqq_IgPe4wA8hkQ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={onClick}
      >
        {currentLocation && (
          <Circle
            center={currentLocation}
            radius={50}
            options={{
              strokeColor: '#0088ff',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#0088ff',
              fillOpacity: 0.35,
            }}
          />
        )}
        {endLocation && <Marker position={endLocation} />}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
