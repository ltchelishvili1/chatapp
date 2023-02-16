import styled, { css } from "styled-components";

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;


  ${({ isImage }) =>
    isImage &&
    css`
      background: #0080ff;
      color: #fff;
      padding: 10px;
      opacity: .7;
      cursor: pointer;
      display: block;
      margin-bottom: 0;
      height: 20px;
    `};

`;
export const InputCont = styled.input`
  padding: 8px;
  border-radius: 4px;
  width: 230px;
  border: 1px solid #ccc;
  margin-top: 8px;

  ${({ isValid }) =>
    isValid &&
    css`
      border: 1px solid red;
    `};

  ${({ isButton }) =>
    isButton &&
    css`
      &:disabled {
        opacity: 0.4;
      }
      background-color: #0080ff;
      color: white;
      padding: 12px 60px;
      width: 180px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
    `};

`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;
