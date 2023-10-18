import React, { Component, useContext, useEffect, useState } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Paper,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  InputLabel,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";

// import { AuthContext } from "../UserContext";
// import { authO, provider, provider1 } from "../GoogleSignIn/congif";
// import { signInWithPopup } from "firebase/auth";
import google from "../Images/google.svg";
import { style } from "@mui/system";

const Login = () => {
  const theme = createTheme({ palette: { mode: "light" } });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notvalid, setNotValid] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);
    try {
      setNotValid(false);
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      if (response.data.error === "Either the username or password is invalid")
        setNotValid(true);
      else if (response.data.authenticatedUser === true) {
        setNotValid(false);

        console.log(notvalid);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const paperStyle = {
    padding: "30px 20px",
    margin: "20px 20px",
    width: "350",
  };

  //   const themeStyle = {
  //     padding: "30px 20px",
  //     width: "350",
  //     margin: "20px auto",
  //   };

  return (
    <Paper elevation={20} style={paperStyle}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="login">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className="Label">
              Login
            </Typography>
            {/* {session_expired && session_expired
            ? "Your session was expired"
            : null} */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <InputLabel sx={{ color: "black" }} htmlFor="email">
                Email
              </InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                value={email}
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  style: {},
                  //   disableUnderline: true,
                }}
                InputLabelProps={{
                  style: { color: "red" },
                }}
              />
              {/* {invalidEmail && invalidEmail ? "Invalid EmailID" : null} */}
              <InputLabel sx={{ color: "black" }} htmlFor="password">
                Password
              </InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{
                  style: { color: "black" },
                }}
              />
              {notvalid && notvalid ? "wrong email or password" : null}
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                color="inherit"
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs={6}>
                  <Link href="/resetpass" variant="body2" className="Link">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Link href="/registration" variant="body2" className="Link">
                    Do not have an account?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Paper>
  );
};

export default Login;