import styled, { css } from "styled-components";

import { Route, Routes, Navigate, Link, useLocation } from "react-router-dom";

import LoginPage from "./routes/loginpage/LoginPage-component";
import RegisterPage from "./routes/registerpage/RegisterPage-component";
import {
  auth,
  onAuthChangedListener,
  signOutUser,
} from "./utils/firebase/firebase";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/user-context";
import ChatPage from "./routes/chatpage/chatpage-component";
import DisplayImage from "./components/displayImage/displayimage.component";
import { ChatContext } from "./contexts/chat-context";
import LoadSpinner from "./components/spinner/LoadSpinner";

function App() {
  const { pathname } = useLocation();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const { data } = useContext(ChatContext);
console.log( 10 
  %
   2 
  +
   25 
  /
   5 
  *
   7 
  %
   4 
  +
   3 )
  let routes = (
    <Routes>
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );

  useEffect(() => {
    const unsubscribe = onAuthChangedListener((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      {data.isLoading && <LoadSpinner asOverlay />}
      <AppContainer>
        {currentUser ? (
          <ChatPage />
        ) : (
          <>
            {" "}
            <Switch>
              <CustomLink
                isSelected={!pathname.replace("/", "").localeCompare("login")}
                to={"/"}
              >
                Login
              </CustomLink>
              <CustomLink
                isSelected={
                  !pathname.replace("/", "").localeCompare("register")
                }
                to={"/register"}
              >
                Register
              </CustomLink>
            </Switch>
            <main>{routes}</main>
          </>
        )}
      </AppContainer>
      {data.displayImage && (
        <DisplayImage>
          {data.displayImage && <img src={data.displayImage} />}
        </DisplayImage>
      )}
    </>
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
  @media (max-width: 600px) {
    width: 100%;
    position: initial;
    transform: none;
    display: block;

    background: #3d3d3d;
  }
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
