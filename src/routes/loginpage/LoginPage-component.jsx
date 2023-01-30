import React, { useState } from "react";
import { signInUsingEmailAndPassword } from "../../utils/firebase/firebase";
import styled from "styled-components";
import LoginLottie from "./LoginLottie.json";
import LottieModal from "../../components/lottieModal/LottieModal-component";

import { Form, Tittle, Button } from "./LoginPage-styles";

import Input from "../../components/Input/Input-component";
import {
  validate,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utils/validate/validators";

export const VALIDATORS = {
  email: [VALIDATOR_EMAIL()],
  password: [VALIDATOR_MINLENGTH(6)],
};

function LoginPage() {
  const [state, setState] = useState({
    email: {
      value: "",
      isValid: false,
      isTouched: false,
    },
    password: {
      value: "",
      isValid: false,
      isTouched: false,
    },
  });

  const ValidateForm = () => {
    return Object.keys(state).every(
      (key) => state[key].isValid && state[key].isTouched
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!state.email.value || !state.password.value) {
      return;
    }
    try {
      await signInUsingEmailAndPassword(
        state.email.value,
        state.password.value
      );
    } catch (error) {
      console.log("user creation error", error);
    }
  };

  const handleChange = (event) => {
    const stateCopy = { ...state };
    stateCopy[event.target.name].value = event.target.value;
    stateCopy[event.target.name].isTouched = true;
    stateCopy[event.target.name].isValid = validate(
      event.target.value,
      VALIDATORS[event.target.name]
    );
    setState(stateCopy);
  };
  console.log(ValidateForm());
  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <Form onSubmit={handleSubmit}>
          <Tittle>Login</Tittle>
          <Input
            text={"Email"}
            type={"email"}
            name="email"
            onChange={handleChange}
            validators={VALIDATORS.email}
            errorText={"Please Use Email"}
            isTouched={state.email.isTouched}
            value={state.email.value}
          />

          <Input
            text={"Password"}
            type={"password"}
            name="password"
            onChange={handleChange}
            validators={VALIDATORS.password}
            errorText={"Must Contain at least 6 charachters"}
            isTouched={state.password.isTouched}
            value={state.password.value}
          />

          <Input type="submit" disabled={!ValidateForm()}/>
        </Form>
      </LoginFormContainer>
      <div>
        <LottieModal animJSON={LoginLottie} />
      </div>
    </LoginPageContainer>
  );
}

export default LoginPage;

export const LoginPageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70vh;
  background: #4d4d4d;
  border-radius: 10px;
`;

export const LoginFormContainer = styled.div`
  width: 50%;
`;
