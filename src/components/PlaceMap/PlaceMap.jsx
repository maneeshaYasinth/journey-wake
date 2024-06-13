import {
    DirectionsRenderer,
    GoogleMap,
    InfoWindow,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api";
import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";

// Define the libraries array outside the component to avoid recreating it on each render
const libraries = ["places", "directions"];

const PlaceMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distanceToTarget, setDistanceToTarget] = useState(null);
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [directionsResponse, setDirectionsResponse] = useState(null); // State for directions response

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBST9IE1oYAtjIM6-uJnqq_IgPe4wA8hkQ", // Replace with your actual API key
    libraries,
  });

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleUserLocation = (position) => {
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleUserLocation);
    }
  }, []);

  // Calculate distance to target location
  useEffect(() => {
    if (userLocation && selectedLocation) {
      const calculatedDistance = getDistance(userLocation, selectedLocation);
      setDistanceToTarget(calculatedDistance);

      // Enable alarm if within 2 km
      if (calculatedDistance <= 2000) {
        setIsAlarmEnabled(true);
      } else {
        setIsAlarmEnabled(false);
      }
    }
  }, [userLocation, selectedLocation]);

  // Play alarm sound
  useEffect(() => {
    if (isAlarmEnabled) {
      // Replace with your own alarm sound implementation
      const alarmSound = new Audio("../../audio/site_alarm.mp3");
      alarmSound.play();
    }else{
        alert("reached your destination")
    }
  }, [isAlarmEnabled]);

  // Handle search location input
  const handleSearchChange = (e) => {
    setSearchLocation(e.target.value);
  };

  // Function to find location by name using Places API
  const findLocationByName = () => {
    if (!isLoaded) return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("search-input")
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setSelectedLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        // Get directions after setting the selected location
        calculateDirections();
      }
    });
  };

  // Function to calculate directions using Directions API
  const calculateDirections = async () => {
    if (!isLoaded || !userLocation || !selectedLocation) return;

    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin: userLocation,
      destination: selectedLocation,
      travelMode: window.google.maps.TravelMode.DRIVING, // You can change travel mode
    };
    try {
      const response = await directionsService.route(request);
      setDirectionsResponse(response);
    } catch (error) {
      console.error("Error getting directions:", error);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Location Tracker</h1>
      <input
        id="search-input"
        type="text"
        placeholder="Search Location"
        value={searchLocation}
        onChange={handleSearchChange}
      />
      <button onClick={findLocationByName}>Search</button>
      <GoogleMap
        mapContainerStyle={{ height: "500px", width: "100%" }}
        center={userLocation || { lat: 0, lng: 0 }}
        zoom={10}
        onClick={handleMapClick}
      >
        {userLocation && <Marker position={userLocation} />}
        {selectedLocation && <Marker position={selectedLocation} />}
        {/* Render directions if available */}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
        {selectedLocation && (
          <InfoWindow position={selectedLocation}>
            <div>
              <p>Selected Location</p>
              <p>
                Distance:{" "}
                {distanceToTarget ? `${distanceToTarget / 1000} km` : "N/A"}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      {distanceToTarget && (
        <p>Distance to Target: {distanceToTarget / 1000} km</p>
      )}
    </div>
  );
};

export default PlaceMap;

// test 4 gemini
// import {
//   DirectionsRenderer,
//   GoogleMap,
//   InfoWindow,
//   Marker,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { getDistance } from "geolib";
// import React, { useEffect, useState } from "react";

// const Map = () => {
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [distanceToTarget, setDistanceToTarget] = useState(null);
//   const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
//   const [searchLocation, setSearchLocation] = useState(null);
//   const [directionsResponse, setDirectionsResponse] = useState(null); // State for directions response

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "AIzaSyBST9IE1oYAtjIM6-uJnqq_IgPe4wA8hkQ",
//     libraries: ["places", "directions"], // Include Places and Directions libraries
//   });

//   const handleMapClick = (event) => {
//     setSelectedLocation({
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     });
//   };

//   const handleUserLocation = (position) => {
//     setUserLocation({
//       lat: position.coords.latitude,
//       lng: position.coords.longitude,
//     });
//   };

//   // Get user location on mount
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(handleUserLocation);
//     }
//   }, []);

//   // Calculate distance to target location
//   useEffect(() => {
//     if (userLocation && selectedLocation) {
//       const calculatedDistance = getDistance(userLocation, selectedLocation);
//       setDistanceToTarget(calculatedDistance);

//       // Enable alarm if within 2 km
//       if (calculatedDistance <= 2000) {
//         setIsAlarmEnabled(true);
//       } else {
//         setIsAlarmEnabled(false);
//       }
//     }
//   }, [userLocation, selectedLocation]);

//   // Play alarm sound
//   useEffect(() => {
//     if (isAlarmEnabled) {
//       // Replace with your own alarm sound implementation
//       const alarmSound = new Audio("alarm.mp3");
//       alarmSound.play();
//     }
//   }, [isAlarmEnabled]);

//   // Handle search location input
//   const handleSearchChange = (e) => {
//     setSearchLocation(e.target.value);
//   };

//   // Function to find location by name using Places API
//   const findLocationByName = () => {
//     if (!isLoaded) return;
//     const autocomplete = new window.google.maps.places.Autocomplete(
//       document.getElementById("search-input")
//     );

//     autocomplete.addListener("place_changed", () => {
//       const place = autocomplete.getPlace();
//       if (place.geometry) {
//         setSelectedLocation({
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng(),
//         });
//         // Get directions after setting the selected location
//         calculateDirections();
//       }
//     });
//   };

//   // Function to calculate directions using Directions API
//   const calculateDirections = async () => {
//     if (!isLoaded || !userLocation || !selectedLocation) return;

//     const directionsService = new window.google.maps.DirectionsService();
//     const request = {
//       origin: userLocation,
//       destination: selectedLocation,
//       travelMode: window.google.maps.TravelMode.DRIVING, // You can change travel mode
//     };
//     try {
//       const response = await directionsService.route(request);
//       setDirectionsResponse(response);
//     } catch (error) {
//       console.error("Error getting directions:", error);
//     }
//   };

//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Location Tracker</h1>
//       <input
//         id="search-input"
//         type="text"
//         placeholder="Search Location"
//         value={searchLocation}
//         onChange={handleSearchChange}
//       />
//       <button onClick={findLocationByName}>Search</button>
//       <GoogleMap
//         mapContainerStyle={{ height: "500px", width: "100%" }}
//         center={userLocation || { lat: 0, lng: 0 }}
//         zoom={10}
//         onClick={handleMapClick}
//       >
//         {userLocation && <Marker position={userLocation} />}
//         {selectedLocation && <Marker position={selectedLocation} />}
//         {/* Render directions if available */}
//         {directionsResponse && (
//           <DirectionsRenderer directions={directionsResponse} />
//         )}
//         {selectedLocation && (
//           <InfoWindow position={selectedLocation}>
//             <div>
//               <p>Selected Location</p>
//               <p>
//                 Distance:{" "}
//                 {distanceToTarget ? `${distanceToTarget / 1000} km` : "N/A"}
//               </p>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//       {distanceToTarget && (
//         <p>Distance to Target: {distanceToTarget / 1000} km</p>
//       )}
//     </div>
//   );
// };

// export default Map;

// test 3

// import {
//   GoogleMap,
//   InfoWindow,
//   Marker,
//   Polyline,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { getDistance } from "geolib";
// import React, { useEffect, useState } from "react";

// const Map = () => {
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [distanceToTarget, setDistanceToTarget] = useState(null);
//   const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
//   const [searchLocation, setSearchLocation] = useState(null); // State for searched location

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "AIzaSyBST9IE1oYAtjIM6-uJnqq_IgPe4wA8hkQ", // Replace with your API key
//     libraries: ["places"], // Include Places library for location search
//   });

//   const handleMapClick = (event) => {
//     setSelectedLocation({
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     });
//   };

//   const handleUserLocation = (position) => {
//     setUserLocation({
//       lat: position.coords.latitude,
//       lng: position.coords.longitude,
//     });
//   };

//   // Get user location on mount
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(handleUserLocation);
//     }
//   }, []);

//   // Calculate distance to target location
//   useEffect(() => {
//     if (userLocation && selectedLocation) {
//       const calculatedDistance = getDistance(userLocation, selectedLocation);
//       setDistanceToTarget(calculatedDistance);

//       // Enable alarm if within 2 km
//       if (calculatedDistance <= 2000) {
//         setIsAlarmEnabled(true);
//       } else {
//         setIsAlarmEnabled(false);
//       }
//     }
//   }, [userLocation, selectedLocation]);

//   // Play alarm sound
//   useEffect(() => {
//     if (isAlarmEnabled) {
//       // Replace with your own alarm sound implementation
//       const alarmSound = new Audio("alarm.mp3");
//       alarmSound.play();
//     }
//   }, [isAlarmEnabled]);

//   // Handle search location input
//   const handleSearchChange = (e) => {
//     setSearchLocation(e.target.value);
//   };

//   // Function to find location by name using Places API
//   const findLocationByName = () => {
//     if (!isLoaded) return;
//     const autocomplete = new window.google.maps.places.Autocomplete(
//       document.getElementById("search-input")
//     );

//     autocomplete.addListener("place_changed", () => {
//       const place = autocomplete.getPlace();
//       if (place.geometry) {
//         setSelectedLocation({
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng(),
//         });
//       }
//     });
//   };

//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Location Tracker</h1>
//       <input
//         id="search-input"
//         type="text"
//         placeholder="Search Location"
//         value={searchLocation}
//         onChange={handleSearchChange}
//       />
//       <button onClick={findLocationByName}>Search</button>
//       <GoogleMap
//         mapContainerStyle={{ height: "500px", width: "100%" }}
//         center={userLocation || { lat: 0, lng: 0 }}
//         zoom={10}
//         onClick={handleMapClick}
//       >
//         {userLocation && <Marker position={userLocation} />}
//         {selectedLocation && <Marker position={selectedLocation} />}
//         {/* Draw polyline if both locations are available */}
//         {userLocation && selectedLocation && (
//           <Polyline
//             path={[userLocation, selectedLocation]}
//             options={{ strokeColor: "#FF0000", strokeWeight: 2 }}
//           />
//         )}
//         {selectedLocation && (
//           <InfoWindow position={selectedLocation}>
//             <div>
//               <p>Selected Location</p>
//               <p>
//                 Distance:{" "}
//                 {distanceToTarget ? `${distanceToTarget / 1000} km` : "N/A"}
//               </p>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//       {distanceToTarget && (
//         <p>Distance to Target: {distanceToTarget / 1000} km</p>
//       )}
//     </div>
//   );
// };

// export default Map;

// test 2

// import {
//   GoogleMap,
//   InfoWindow,
//   Marker,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { getDistance } from "geolib";
// import React, { useEffect, useState } from "react";

// const Map = () => {
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [distanceToTarget, setDistanceToTarget] = useState(null);
//   const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "AIzaSyBST9IE1oYAtjIM6-uJnqq_IgPe4wA8hkQ",
//     libraries: ["places"], // Include Places library for location search
//   });

//   const handleMapClick = (event) => {
//     setSelectedLocation({
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     });
//   };

//   const handleUserLocation = (position) => {
//     setUserLocation({
//       lat: position.coords.latitude,
//       lng: position.coords.longitude,
//     });
//   };

//   // Get user location on mount
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(handleUserLocation);
//     }
//   }, []);

//   // Calculate distance to target location
//   useEffect(() => {
//     if (userLocation && selectedLocation) {
//       const calculatedDistance = getDistance(userLocation, selectedLocation);
//       setDistanceToTarget(calculatedDistance);

//       // Enable alarm if within 2 km
//       if (calculatedDistance <= 2000) {
//         setIsAlarmEnabled(true);
//       } else {
//         setIsAlarmEnabled(false);
//       }
//     }
//   }, [userLocation, selectedLocation]);

//   // Play alarm sound
//   useEffect(() => {
//     if (isAlarmEnabled) {
//       // Replace with your own alarm sound implementation
//       const alarmSound = new Audio("alarm.mp3");
//       alarmSound.play();
//     }
//   }, [isAlarmEnabled]);

//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Location Tracker</h1>
//       <GoogleMap
//         mapContainerStyle={{ height: "500px", width: "100%" }}
//         center={userLocation || { lat: 0, lng: 0 }}
//         zoom={10}
//         onClick={handleMapClick}
//       >
//         {userLocation && <Marker position={userLocation} />}
//         {selectedLocation && <Marker position={selectedLocation} />}
//         {selectedLocation && (
//           <InfoWindow position={selectedLocation}>
//             <div>
//               <p>Selected Location</p>
//               <p>
//                 Distance:{" "}
//                 {distanceToTarget ? `${distanceToTarget / 1000} km` : "N/A"}
//               </p>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//       {distanceToTarget && (
//         <p>Distance to Target: {distanceToTarget / 1000} km</p>
//       )}
//     </div>
//   );
// };

// export default Map;

// import {
//   GoogleMap,
//   InfoWindow,
//   Marker,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { distance } from "geolib";
// import React, { useEffect, useState } from "react";

// const Map = () => {
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [distanceToTarget, setDistanceToTarget] = useState(null);
//   const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "AIzaSyBST9IE1oYAtjIM6-uJnqq_IgPe4wA8hkQ",
//     libraries: ["places"], // Include Places library for location search
//   });

//   const handleMapClick = (event) => {
//     setSelectedLocation({
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     });
//   };

//   const handleUserLocation = (position) => {
//     setUserLocation({
//       lat: position.coords.latitude,
//       lng: position.coords.longitude,
//     });
//   };

//   // Get user location on mount
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(handleUserLocation);
//     }
//   }, []);

//   // Calculate distance to target location
//   useEffect(() => {
//     if (userLocation && selectedLocation) {
//       const calculatedDistance = distance(userLocation, selectedLocation);
//       setDistanceToTarget(calculatedDistance);

//       // Enable alarm if within 2 km
//       if (calculatedDistance <= 2000) {
//         setIsAlarmEnabled(true);
//       } else {
//         setIsAlarmEnabled(false);
//       }
//     }
//   }, [userLocation, selectedLocation]);

//   // Play alarm sound
//   useEffect(() => {
//     if (isAlarmEnabled) {
//       // Replace with your own alarm sound implementation
//       const alarmSound = new Audio("alarm.mp3");
//       alarmSound.play();
//     }
//   }, [isAlarmEnabled]);

//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Location Tracker</h1>
//       <GoogleMap
//         mapContainerStyle={{ height: "500px", width: "100%" }}
//         center={userLocation || { lat: 0, lng: 0 }}
//         zoom={10}
//         onClick={handleMapClick}
//       >
//         {userLocation && <Marker position={userLocation} />}
//         {selectedLocation && <Marker position={selectedLocation} />}
//         {selectedLocation && (
//           <InfoWindow position={selectedLocation}>
//             <div>
//               <p>Selected Location</p>
//               <p>
//                 Distance:{" "}
//                 {distanceToTarget ? `${distanceToTarget / 1000} km` : "N/A"}
//               </p>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//       {distanceToTarget && (
//         <p>Distance to Target: {distanceToTarget / 1000} km</p>
//       )}
//     </div>
//   );
// };

// export default Map;
