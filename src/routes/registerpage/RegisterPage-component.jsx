import React, { useState } from "react";

import RegistrationLottie from "./RegistrationLottie.json";

import {
  RegisterFormContainer,
  RegisterPageContainer,
  StyledForm,
  StyledTittle,
  UploadImageCont,
} from "./RegisterPage-styles";
import LottieModal from "../../components/lottieModal/LottieModal-component";
import Input from "../../components/Input/Input-component";
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  UploadImage,
} from "../../utils/firebase/firebase";
import {
  validate,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REPEATPASSWORD,
  VALIDATOR_REQUIRE,
} from "../../utils/validate/validators";

const RegisterPage = () => {
  const [state, setState] = useState({
    email: {
      value: "",
      isValid: false,
      isTouched: false,
    },
    username: {
      value: "",
      isValid: false,
      isTouched: false,
    },
    password: {
      value: "",
      isValid: false,
      isTouched: false,
    },
    repeatPassword: {
      value: "",
      isValid: false,
      isTouched: false,
    },
    image: {
      value: "",
      isValid: true,
      isTouched: true,
    },
  });

  const VALIDATORS = {
    email: [VALIDATOR_EMAIL()],
    username: [VALIDATOR_MINLENGTH(4)],
    password: [VALIDATOR_MINLENGTH(6)],
    repeatPassword: [VALIDATOR_REPEATPASSWORD()],
  };

  const handleChange = (event) => {
    const stateCopy = { ...state };
    stateCopy[event.target.name].value = event.target.value;
    stateCopy[event.target.name].isTouched = true;
    stateCopy[event.target.name].isValid =
      event.target.name.localeCompare("repeatPassword") === 0
        ? validate(event.target.value, [
            VALIDATOR_REPEATPASSWORD(state.password),
          ])
        : validate(event.target.value, VALIDATORS[event.target.name]);
    setState(stateCopy);
  };

  const handleImage = async (event) => {
    try {
      await UploadImage(event.target.files[0],state.email.value);
    } catch (err) {
      console.log(err);
    }
  };

  const ValidateForm = () => {
    return Object.keys(state).every(
      (key) => state[key].isValid && state[key].isTouched
    );
  };

  const handleSubmit = async (event) => {
    const { email, username, password, repeatPassword, image } = state;

    event.preventDefault();
    if (password.value != repeatPassword.value) {
      alert("password do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email.value,
        password.value,
        username.value,
       //photourl
      );

      await createUserDocumentFromAuth(user, {
        username: username.value,
        password: password.value,
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("email already in use ");
      }
      console.log("user creation error", error);
    }
  };

  return (
    <RegisterPageContainer>
      <RegisterFormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTittle>Registration</StyledTittle>
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
            text={"UserName"}
            type={"text"}
            name="username"
            onChange={handleChange}
            validators={[VALIDATOR_MINLENGTH(4)]}
            errorText={"Minimum Length 4"}
            isTouched={state.username.isTouched}
            value={state.username.value}
          />
          <Input
            text={"Password"}
            type={"password"}
            name="password"
            onChange={handleChange}
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText={"Must Contain at least 6 charachters"}
            isTouched={state.password.isTouched}
            value={state.password.value}
          />
          <Input
            text={"RepeatPassword"}
            type={"password"}
            name="repeatPassword"
            onChange={handleChange}
            validators={[
              VALIDATOR_MINLENGTH(6),
              VALIDATOR_REPEATPASSWORD(state.password),
            ]}
            errorText={"Password does not match"}
            isTouched={state.repeatPassword.isTouched}
            value={state.repeatPassword.value}
          />

          <UploadImageCont>
            <Input
              text={"Choose image"}
              type={"file"}
              name="image"
              onChange={handleImage}
              isTouched={state.image.isTouched}
              value={state.image.value}
              validators={[VALIDATOR_REQUIRE()]}
            />
            {state.image.value && (
              <img src={URL.createObjectURL(state.image.value)} alt="img" />
            )}
          </UploadImageCont>

          <Input type="submit" disabled={!ValidateForm()} />
        </StyledForm>
      </RegisterFormContainer>
      <div>
        <LottieModal animJSON={RegistrationLottie} />
      </div>
    </RegisterPageContainer>
  );
};

export default RegisterPage;
