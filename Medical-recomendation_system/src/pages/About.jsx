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

const About = () => {
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
              About HealTide
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
              Welcome to HealTide
            </Typography>
            <Typography sx={{ textAlign: "justify" }}>
              HealTide is a web-based platform that helps users make informed
              health decisions by providing personalized medical recommendations
              based on symptom analysis. Using Natural Language Processing (NLP)
              and Machine Learning (ML), HealTide interprets your symptoms
              described in everyday language and offers tailored advice, ranging
              from treatment suggestions to lifestyle changes. Our mission is to
              make healthcare more accessible, accurate, and actionable for
              everyone, regardless of their medical background.
            </Typography>

            <Typography variant="h5" sx={{ marginTop: "20px" }}>
              What Makes HealTide Different?
            </Typography>
            <Typography sx={{ textAlign: "justify" }}>
              HealTide stands out by offering personalized treatment suggestions
              based on symptom analysis, utilizing advanced technologies like
              BERT and machine learning models such as Random Forest Classifier
              and Logistic Regression. The platform provides accurate,
              context-aware health recommendations tailored to each user’s
              unique needs, even when they describe their symptoms in everyday
              language. HealTide simplifies the process by understanding user
              input and offering actionable advice, whether it’s for managing
              specific conditions or improving overall wellness. Additionally,
              it integrates features like Google Maps to help users find nearby
              healthcare facilities and offers a comprehensive health management
              system, including medication, diet, and exercise guidance. The
              platform also tracks health data over time, providing valuable
              insights and progress reports, while its calendar integration
              ensures users stay on top of their health goals with timely
              reminders.
            </Typography>

            <Typography variant="h5" sx={{ marginTop: "20px" }}>
              Why Choose HealTide?
            </Typography>
            <Typography sx={{ textAlign: "justify" }}>
              HealTide combines advanced Natural Language Processing (NLP) and
              Machine Learning (ML) technologies to deliver highly accurate,
              personalized health recommendations based on real medical data.
              The platform is user-friendly, allowing anyone to describe
              symptoms in simple terms and receive relevant, actionable advice.
              We prioritize your privacy by adhering to strict data protection
              standards, ensuring your health information remains secure.
              Available 24/7, HealTide offers consistent, reliable support for
              users seeking medical guidance and health management, anytime they
              need it. Whether you're managing a long-term condition, looking
              for personalized treatment suggestions, or simply seeking advice
              on your overall health, HealTide is here to support you every step
              of the way.
            </Typography>

            <Typography variant="h5" sx={{ marginTop: "20px" }}>
              Our Vision
            </Typography>
            <Typography sx={{ textAlign: "justify" }}>
              At HealTide, we believe healthcare should be accessible to
              everyone, understandable, and personalized. Our vision is to
              bridge the gap between advanced medical technology and
              individuals, enabling them to manage their health with ease and
              confidence. Through intuitive design and advanced AI-powered
              technology, HealTide empowers users to take charge of their health
              and make informed decisions for a better quality of life.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "20px" }}
              href="/"
            >
              Take the First Step Toward a Healthier Life
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default About;

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
