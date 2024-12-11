import React, { useEffect, useState } from "react";
import loadGoogleMapsScript from "./googleMapsLoader"; // Adjust path as necessary

const NearbyHospitals = ({ coordinates }) => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    loadGoogleMapsScript(apiKey)
      .then((google) => {
        findNearbyHospitals(google);
      })
      .catch((error) =>
        console.error("Failed to load Google Maps script:", error)
      );
  }, [coordinates]);

  const findNearbyHospitals = (google) => {
    if (!coordinates.latitude || !coordinates.longitude) return;

    setLoading(true);

    const map = new google.maps.Map(document.createElement("div")); // Fake map element
    const service = new google.maps.places.PlacesService(map);

    const request = {
      location: new google.maps.LatLng(
        coordinates.latitude,
        coordinates.longitude
      ),
      radius: 10000,
      type: "hospital",
    };

    service.nearbySearch(request, (results, status) => {
      setLoading(false);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setHospitals(results);
      } else {
        console.error("PlacesService Error:", status);
        setHospitals([]);
      }
    });
  };

  return (
    <div>
      <h3>Nearby Hospitals</h3>
      {loading ? (
        <p>Loading hospitals...</p>
      ) : hospitals.length > 0 ? (
        <ul>
          {hospitals.map((hospital, index) => (
            <li key={index}>
              <strong>{hospital.name}</strong>
              <p>{hospital.vicinity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hospitals found within 10km.</p>
      )}
    </div>
  );
};

export default NearbyHospitals;
