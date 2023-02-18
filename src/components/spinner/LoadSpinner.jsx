import React from "react";

import styled, { css } from "styled-components";

const LoadSpinner = ({ asOverlay }) => {
  return (
    <Overlay asOverlay={asOverlay}>
      {<SpinnerCont className="lds-dual-ring"></SpinnerCont>}
    </Overlay>
  );
};



export default LoadSpinner;

export const SpinnerCont = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;

  &::after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #510077;
    border-color: #510077 transparent #510077 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Overlay = styled.div`
  ${({ asOverlay }) =>
    asOverlay &&
    css`
      height: 100%;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, .3);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `};
`;

