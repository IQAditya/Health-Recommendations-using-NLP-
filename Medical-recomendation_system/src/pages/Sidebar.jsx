import * as React from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Import LocationOnIcon

const SideBar = () => {
  const location = useLocation();

  // Custom color for selected icons
  const selectedColor = "#19A3B5";

  return (
    <>
      <React.Fragment>
        <ListItemButton component={Link} to="/">
          <Tooltip title={"Home"}>
            <ListItemIcon>
              <HomeIcon
                style={{
                  color:
                    location.pathname === ("/" || "/dashboard/home")
                      ? selectedColor
                      : "inherit",
                }}
              />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/dashboard">
          <Tooltip title={"Dash"}>
            <ListItemIcon>
              <AssignmentIcon
                style={{
                  color: location.pathname.startsWith("/dashboard")
                    ? selectedColor
                    : "inherit",
                }}
              />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Dash" />
        </ListItemButton>
        {/* Location option added here */}
        <ListItemButton component={Link} to="/dashboard/locations">
          <Tooltip title={"Location"}>
            <ListItemIcon>
              <LocationOnIcon
                style={{
                  color: location.pathname.startsWith("/dashboard/locations")
                    ? selectedColor
                    : "inherit",
                }}
              />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Location" />
        </ListItemButton>
        <ListItemButton component={Link} to="/dashboard/about">
          <Tooltip title={"About"}>
            <ListItemIcon>
              <ClassOutlinedIcon
                style={{
                  color: location.pathname.startsWith("/dashboard/about")
                    ? selectedColor
                    : "inherit",
                }}
              />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="About" />
        </ListItemButton>
        <ListItemButton component={Link} to="/dashboard/feedback">
          <Tooltip title={"Feedback"}>
            <ListItemIcon>
              <SupervisorAccountOutlinedIcon
                style={{
                  color: location.pathname.startsWith("/dashboard/feedback")
                    ? selectedColor
                    : "inherit",
                }}
              />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Feedback" />
        </ListItemButton>
      </React.Fragment>
      <Divider sx={{ my: 1 }} />
      <React.Fragment>
        <ListSubheader component="div" inset>
          User
        </ListSubheader>
        <ListItemButton component={Link} to="/dashboard/profile">
          <Tooltip title={"Profile"}>
            <ListItemIcon>
              <AccountCircleOutlinedIcon
                style={{
                  color: location.pathname.startsWith("/dashboard/profile")
                    ? selectedColor
                    : "inherit",
                }}
              />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton component={Link} to="/logout">
          <Tooltip title={"Logout"}>
            <ListItemIcon>
              <ExitToAppIcon
                style={{
                  color: location.pathname.startsWith("/logout")
                    ? selectedColor
                    : "inherit",
                }}
              />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default SideBar;
