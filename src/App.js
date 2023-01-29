import styled, { css } from "styled-components";

import { Route, Routes, Navigate, Link, useLocation } from "react-router-dom";

import LoginPage from "./routes/loginpage/LoginPage-component";
import RegisterPage from "./routes/registerpage/RegisterPage-component";

function App() {
  const { pathname } = useLocation();
  let routes = (
    <Routes>
      <Route exact path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
  return (
    <AppContainer>
      <Switch>
        <CustomLink
          isSelected={!pathname.replace("/", "").localeCompare("login")}
          to={"/"}
        >
          Login
        </CustomLink>
        <CustomLink
          isSelected={!pathname.replace("/", "").localeCompare("register")}
          to={"/register"}
        >
          Register
        </CustomLink>
      </Switch>
      <main>{routes}</main>
    </AppContainer>
  );
}

export default App;

export const AppContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90vh;
  background: #f0f0f0;
  border-radius: 10px;
`;

export const Switch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
  gap: 10px;
`;

export const CustomLink = styled(Link)`
  display: inline-block;
  position: relative;
  &:hover {
    color: #1f93ff;
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: #1f93ff;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #1f93ff;
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
      }
    `};
`;
