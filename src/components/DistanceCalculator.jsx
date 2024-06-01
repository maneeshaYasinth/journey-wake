import React, { useEffect } from 'react';

const DistanceCalculator = ({ currentLocation, endLocation, setNotificationMessage }) => {
  useEffect(() => {
    if (currentLocation && endLocation) {
      const distance = getDistance(currentLocation, endLocation);
      if (distance < 1000) { // example distance in meters for notification
        setNotificationMessage('You are approaching your destination!');
      }
    }
  }, [currentLocation, endLocation, setNotificationMessage]);

  const getDistance = (loc1, loc2) => {
    const R = 6371e3; // metres
    const φ1 = loc1.lat * Math.PI/180; // φ, λ in radians
    const φ2 = loc2.lat * Math.PI/180;
    const Δφ = (loc2.lat-loc1.lat) * Math.PI/180;
    const Δλ = (loc2.lng-loc1.lng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // in metres
  };

  return null;
};

export default DistanceCalculator;