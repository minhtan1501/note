import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Container } from "@mui/material";
import './firebase/config'

ReactDOM.createRoot(document.getElementById("root")).render(
  <Container maxWidth="lg" sx={{ marginTop: "50px", textAlign: "center" }}>
    <RouterProvider router={router}></RouterProvider>
  </Container>
);
