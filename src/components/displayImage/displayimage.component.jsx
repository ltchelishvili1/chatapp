import React, { useContext } from "react";
import styled from "styled-components";
import { ChatContext } from "../../contexts/chat-context";

const DisplayImage = ({ children }) => {
  const { dispatch } = useContext(ChatContext);

  const handleClick = () => {
    dispatch({ type: "DISPLAY_IMAGE", payload: "" });
  };

  const handleHeaderClick = (event) => {
    event.stopPropagation();
    console.log("Header clicked!");
  };

  return (
    <ImageContainer onClick={handleClick}>
      <ChildrenCont onClick={handleHeaderClick}>{children}</ChildrenCont>
    </ImageContainer>
  );
};

export default DisplayImage;

export const ChildrenCont = styled.div`
 width: 800px;
 height: 500px;
`;

export const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #333333c6;
  backdrop-filter: blur(5px);
  display: grid;
  place-items: center;
  img {
    width: 800px;
 height: 500px;
    border-radius: 5px;
  }
`;
