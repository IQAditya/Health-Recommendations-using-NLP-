import { useState } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Route, Routes } from "react-router-dom";
import { AppBar, Drawer } from "../components/styles";
import Logout from "./Logout";
import SideBar from "./Sidebar";

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          open={open}
          position="absolute"
          sx={{ backgroundColor: "#19A3B5" }}
        >
          <Toolbar sx={{ pr: "4px" }}>
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
              Feedback
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
          <Box sx={{ padding: "30px" }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ marginBottom: "20px" }}
            >
              We Value Your Feedback!
            </Typography>
            <Typography sx={{ textAlign: "justify" }}>
              HealTide is an ongoing project aimed at improving medical
              recommendations through advanced Natural Language Processing
              (NLP). Your feedback is essential in helping us refine the system
              and make it more effective for users like you. Whether you have
              suggestions, comments, or concerns, we’d love to hear from you as
              we continue to evolve this project.
            </Typography>

            <Typography variant="h5" sx={{ marginTop: "20px" }}>
              How Can You Help?
            </Typography>
            <Typography sx={{ textAlign: "justify" }}>
              • Share Your Thoughts: Tell us what you like about HealTide and
              what could be improved.
              <br />
              • Report an Issue: If you've encountered any bugs or technical
              problems, please let us know so we can address them.
              <br />• Suggest New Features: If you have any ideas for features
              that would make HealTide more helpful, we’d love to hear your
              suggestions!
            </Typography>

            <Typography variant="h5" sx={{ marginTop: "20px" }}>
              Tell Us What You Think!
            </Typography>
            <Typography sx={{ textAlign: "justify" }}>
              Your input is crucial for making HealTide a better tool for
              medical recommendations. Click the link below to fill out a quick
              feedback form. We truly appreciate your time and insights!
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "20px" }}
              href="https://docs.google.com/forms/d/e/1FAIpQLSeCgIxHxnIlSah2AhzZpmiVqYTQX2jNPLazo39i7Hh2j_40ew/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer" // For security purposes
            >
              Provide Feedback
            </Button>

            <Typography sx={{ textAlign: "justify", marginTop: "20px" }}>
              Thank you for helping improve HealTide!
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Feedback;

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
