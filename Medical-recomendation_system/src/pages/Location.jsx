import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  List,
  Divider,
  IconButton,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AppBar, Drawer } from "../components/styles";
import SideBar from "./Sidebar";
import MapComponent from "./MapComponent";
import NearbyHospitals from "./NearbyHospitals";

const ListHospitals = ({ hospitals, coordinates }) => {
  const filterHospitals = () => {
    if (window.google && coordinates.latitude && coordinates.longitude) {
      const userLocation = new window.google.maps.LatLng(
        coordinates.latitude,
        coordinates.longitude
      );

      return hospitals.filter((hospital) => {
        const hospitalLocation = new window.google.maps.LatLng(
          hospital.geometry.location.lat,
          hospital.geometry.location.lng
        );

        const distance =
          window.google.maps.geometry.spherical.computeDistanceBetween(
            userLocation,
            hospitalLocation
          );

        return distance <= 10000; // 10 km in meters
      });
    }
    return [];
  };

  const nearbyHospitals = filterHospitals();

  return (
    <Box component="ol" sx={{ pl: 2 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Nearby Hospitals within 10 km
      </Typography>
      {nearbyHospitals.length > 0 ? (
        nearbyHospitals.map((hospital, index) => (
          <li key={index}>
            <Typography variant="subtitle1" color="textPrimary">
              {hospital.name}
            </Typography>
          </li>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No hospitals found within 10 km.
        </Typography>
      )}
    </Box>
  );
};

const Location = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [userAddress, setUserAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [isAddressVisible, setAddressVisibility] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      getUserAddress();
      getHospitalInfo();
    }
  }, [coordinates]);

  const getLocation = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setAddressVisibility(true);
      }, handleLocationError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getUserAddress = async () => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}&key=AIzaSyBJgaWwZWxPPJy0wlcIESMLgwlkbfhyZbQ`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      setUserAddress(data.results[0].formatted_address);
    }
  };

  const getHospitalInfo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
          coordinates.latitude
        },${coordinates.longitude}&radius=10000&type=hospital&key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }`
      );
      const data = await response.json();
      if (data.results) {
        setHospitals(data.results);
      }
    } catch (error) {
      console.error("Error fetching hospital data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        open={open}
        position="absolute"
        sx={{ backgroundColor: "#19A3B5" }}
      >
        <Toolbar sx={{ pr: "24px" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Find the Nearest Hospital
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={open ? styles.drawerStyled : styles.hideDrawer}
      >
        <Toolbar sx={styles.toolBarStyled}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <SideBar />
        </List>
      </Drawer>
      <Box component="main" sx={styles.boxStyled}>
        <Toolbar />
        <Paper elevation={3} sx={{ p: 3, mx: 2, borderRadius: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={getLocation}
            sx={{ mb: 2 }}
          >
            Locate Me
          </Button>
          <Typography variant="h6">Your Coordinates</Typography>
          <Typography variant="body1">
            Latitude: {isAddressVisible ? coordinates.latitude : "Loading..."}
          </Typography>
          <Typography variant="body1">
            Longitude: {isAddressVisible ? coordinates.longitude : "Loading..."}
          </Typography>
          <Typography variant="body1">
            Address: {isAddressVisible ? userAddress : "Loading..."}
          </Typography>
        </Paper>

        {isAddressVisible && (
          <Box sx={{ mt: 3, mx: 2 }}>
            <NearbyHospitals hospitals={hospitals} coordinates={coordinates} />
            <MapComponent coordinates={coordinates} hospitals={hospitals} />
            {/*<Box
              component="img"
              src={`https://maps.googleapis.com/maps/api/staticmap?zoom=14&size=600x400&maptype=roadmap&markers=size:small%7Ccolor:blue%7C${coordinates.latitude},${coordinates.longitude}&key=AIzaSyBJgaWwZWxPPJy0wlcIESMLgwlkbfhyZbQ`}
              alt="Your Location on Google Maps"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                mt: 2,
              }}
            />*/}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Location;

const styles = {
  boxStyled: {
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  toolBarStyled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    px: [1],
  },
  drawerStyled: {
    display: "flex",
  },
  hideDrawer: {
    display: "flex",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
};
