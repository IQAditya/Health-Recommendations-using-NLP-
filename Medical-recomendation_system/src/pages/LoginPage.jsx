import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bg from "../assets/login.png";
//import pagebg from "../assests/bgs.jpg";
import { DarkBlueButton } from "../components/buttonStyles";
import styled from "styled-components";

const defaultTheme = createTheme();

const LoginPage = () => {
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "patientName") setPatientName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const validateForm = () => {
    let valid = true;
    setEmailError(false);
    setPasswordError(false);

    if (!email) {
      setEmailError(true);
      valid = false;
    }

    if (!password) {
      setPasswordError(true);
      valid = false;
    }

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoader(true);
    // Handle login logic here
    setTimeout(() => {
      setLoader(false);
      navigate("/dashboard");
    }, 2000); // Simulate API call
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          //backgroundImage: `url(${pagebg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <CssBaseline />
        <Box sx={sharedBoxStyles}>
          <Grid container spacing={2}>
            {/* Login Form Section */}
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 4,
                }}
              >
                <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                  Login
                </Typography>
                <Typography variant="h7">
                  Welcome back! Please enter your details
                </Typography>
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 2 }}
                  onSubmit={handleSubmit}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Enter your email"
                    name="email"
                    autoComplete="email"
                    error={emailError}
                    helperText={emailError && "Email is required"}
                    onChange={handleInputChange}
                    value={email}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={toggle ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    error={passwordError}
                    helperText={passwordError && "Password is required"}
                    onChange={handleInputChange}
                    value={password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setToggle(!toggle)}>
                            {toggle ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <StyledLink href="#">Forgot password?</StyledLink>
                  </Grid>
                  <DarkBlueButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 3 }}
                  >
                    {loader ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Login"
                    )}
                  </DarkBlueButton>
                  <Typography sx={{ mt: 1 }}>
                    New user? <StyledLink to="/register">Signup</StyledLink>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* Image Section */}
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  height: "100%",
                  backgroundImage: `url(${bg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={guestLoader}
      >
        <CircularProgress color="primary" />
        Please Wait
      </Backdrop>
    </ThemeProvider>
  );
};

export default LoginPage;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #1c7783;
`;

const sharedBoxStyles = {
  width: "100%",
  maxWidth: 900,
  height: "auto", // Set a consistent height, e.g., 'auto' to allow it to adjust based on content
  minHeight: 500, // Ensures a minimum height, adjust as needed
  backgroundColor: "#ffffff",
  borderRadius: 2,
  boxShadow: 3,
  display: "flex",
  flexDirection: "row",
};
