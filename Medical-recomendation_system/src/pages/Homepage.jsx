import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Box, Button } from "@mui/material";
import styled from "styled-components";
import Home from "../assets/homelogo-removebg.png";
import { DarkBlueButton } from "../components/buttonStyles";
import { keyframes } from "styled-components";

const textclip = keyframes`
  to {
    background-position: 200% center;
  }
`;

const AnimatedTitle = styled.h1`
  font-size: 3.2rem;
  color: #fff;
  font-weight: bold;
  padding-top: 30px;
  letter-spacing: normal;
  line-height: normal;
  text-transform: uppercase;
  background: linear-gradient(
    -225deg,
    #19a3b5 0%,
    #44107a 29%,
    #ff8d13 67%,
    #19a3b5 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  color: #fff;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${textclip} 5s linear infinite;
`;
const Homepage = () => {
  return (
    <StyledContainer>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <img src={Home} alt="home" style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <AnimatedTitle>HealTide</AnimatedTitle>
            <StyledText>
              Our Personalized Healthcare Recommendation System offers tailored
              health advice using NLP and Python. Simply ask about your
              symptoms, like a headache or fever, and receive accurate medical
              recommendations. This system is designed to provide quick,
              reliable guidance to help you manage your health effectively.
            </StyledText>
            <StyledBox>
              <StyledLink to="/login">
                <DarkBlueButton variant="contained" fullWidth>
                  Login
                </DarkBlueButton>
              </StyledLink>
              <StyledText>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#1C7783" }}>
                  Sign up
                </Link>
              </StyledText>
            </StyledBox>
          </StyledPaper>
        </Grid>
      </Grid>
      <Footer>&copy; 2024 HealTide. All rights reserved.</Footer>
    </StyledContainer>
  );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;
const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: #ffff;
  color: black;
  text-align: center;
  padding: 10px 0;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
