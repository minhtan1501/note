import React, { useContext, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";
import { graphQLrequest } from "../utils/request";

export default function Login() {
  const auth = getAuth();
  const { user } = useContext(AuthContext);
  // const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);
    const data = await graphQLrequest({
      query: `mutation register($uid: String!, $name: String!){
      register(uid: $uid,name: $name){
        uid,
        name
      }
    }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log("user", data);
  };

  if (localStorage.getItem("accessToken")) {
    // navigate("/");
    return <Navigate to="/" />;
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Welcome to Note App
      </Typography>
      <Button onClick={handleLoginWithGoogle} variant="outlined">
        Login with Google
      </Button>
    </>
  );
}
