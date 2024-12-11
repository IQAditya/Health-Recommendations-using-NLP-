import React, { useEffect, useRef } from "react";

const MapComponent = ({ coordinates, hospitals }) => {
  const mapRef = useRef(null); // Reference to the map container

  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      const mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(
          coordinates.latitude,
          coordinates.longitude
        ),
        // No custom styles, so it uses default Google Maps styling
        styles: [], // Ensures default Google Maps styling is applied
      };

      // Create the map instance
      const map = new google.maps.Map(mapRef.current, mapOptions);

      // Optionally, add a marker for the user's location
      new google.maps.Marker({
        position: { lat: coordinates.latitude, lng: coordinates.longitude },
        map: map,
        title: "Your Location",
      });

      // Optionally, add hospital markers if needed
      hospitals.forEach((hospital) => {
        new google.maps.Marker({
          position: hospital.geometry.location,
          map: map,
          title: hospital.name,
        });
      });
    }
  }, [coordinates, hospitals]);

  return (
    <div
      ref={mapRef}
      style={{ height: "400px", width: "100%", borderRadius: "8px" }}
    />
  );
};

export default MapComponent;
