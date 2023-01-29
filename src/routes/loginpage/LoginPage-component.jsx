import React, { useState } from "react";
import { signInWithGooglePopup } from "../../utils/firebase/firebase";
import styled from "styled-components";
import LoginLottie from './LoginLottie.json'
import LottieModal from '../../components/lottieModal/LottieModal-component'

import {Form,Tittle,ErrorMessage,Label,Input, Button} from './LoginPage-styles'

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError("Please enter a username and password");
      return;
    }
  };

  const handleGoogleSubmit = (event) => {
    event.preventDefault();
    signInWithGooglePopup();
  };

  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <Form className="login-form" onSubmit={handleSubmit}>
          <Tittle className="form-title">Login</Tittle>
          {error && <ErrorMessage className="error-message">{error}</ErrorMessage>}
          <Label className="form-label">
            Username:
            <Input
              className="form-input"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Label>
          <Label className="form-label">
            Password:
            <Input
              className="form-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Label>
          <Button className="form-button" type="submit">
            Submit
          </Button>
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
`