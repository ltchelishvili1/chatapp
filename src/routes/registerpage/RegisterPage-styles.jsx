import styled from "styled-components";
import {
  LoginFormContainer,
  LoginPageContainer,
} from "../loginpage/LoginPage-component";
import { Form, Tittle } from "../loginpage/LoginPage-styles";

export const RegisterPageContainer = styled(LoginPageContainer)``;

export const RegisterFormContainer = styled(LoginFormContainer)``;

export const StyledForm = styled(Form)``;

export const StyledTittle = styled(Tittle)``;

export const UploadImageCont = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  img {
    width: 50px;
    border-radius: 50%;
    height: 40px;
  }
`;
