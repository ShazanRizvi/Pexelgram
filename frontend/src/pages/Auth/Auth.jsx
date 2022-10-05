import React from "react";
import "./Auth.css";
import AuthLogo from "../../img/AuthLogo.png";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthActions.js";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const [isSignUp, setIsSignUp] = useState(false);
  const loading = useSelector((state) => state.authReducer.loading);
  const [data, setData] = useState(initialState);
  const [confirmPass, setConfirmPass] = useState(true);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();

  if (isSignUp) {
    data.password === data.confirmpass
      ? dispatch(signUp(data))
      : setConfirmPass(false);
  } else {
    dispatch(logIn(data));
  }
  };
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={AuthLogo} alt="logo" />
      </div>
      <div className="a-right">
        <form className="authForm">
          <h3
            style={{
              textAlign: "center",
              fontSize: "40px",
              fontFamily: "Poppins",
            }}
          >
            <b>{isSignUp ? "Register" : "Login"}</b>
          </h3>
          {isSignUp && (
            <HStack>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  value={data.firstname}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  value={data.lastname}
                />
              </FormControl>
            </HStack>
          )}

          <VStack>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                onChange={handleChange}
                value={data.username}
              />
              <FormHelperText>Username should be unique</FormHelperText>
            </FormControl>
          </VStack>

          <HStack>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                value={data.password}
              />
            </FormControl>
            {isSignUp && (
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="confirmpass"
                  value={data.confirmpass}
                  onChange={handleChange}
                />
              </FormControl>
            )}
          </HStack>
          <VStack>
            {!confirmPass && (
              <Alert status="error">
                <AlertIcon />
                The password should match!
              </Alert>
            )}
            <div>
              <span
                style={{ fontSize: "14px", cursor: "pointer" }}
                onClick={() => {
                  setIsSignUp((prev) => !prev);
                  resetForm();
                }}
              >
                {isSignUp
                  ? "  Already have an account login!"
                  : "Don't have an account! Sign up"}
              </span>
            </div>
            {loading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            ) : (
              <Button
                colorScheme="telegram"
                variant="solid"
                type="submit"
                onClick={handleSubmit}
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </Button>
            )}
          </VStack>
        </form>
      </div>
    </div>
  );
};

export default Auth;
