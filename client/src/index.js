import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import "./index.css";
import UserService from "./services/UserService.js";
import axios from "axios";
const theme = createTheme({
  direction: "ltr",
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: "50px",
        },
        "&:hover": {
          backgroundColor: "secondary.light !important",
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "DM Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#1A191E",
      bluish: "#215190",
    },
    secondary: {
      main: "#C4B28F",
      dark: "#b0a080",
      light: "#D5C9B0",
    },
    background: {
      default: "#F1F3F4",
    },
    // secondary: purple,
  },
});
const _axios = axios.create({
  baseURL: "http://localhost:3001/",
});
_axios.interceptors.request.use((config) => {
  if (UserService.isLoggedIn()) {
    const cb = () => {
      config.headers.Authorization = `Bearer ${UserService.getToken()}`;
      return Promise.resolve(config);
    };
    return UserService.updateToken(cb);
  }
});
const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

UserService.initKeycloak(renderApp);
