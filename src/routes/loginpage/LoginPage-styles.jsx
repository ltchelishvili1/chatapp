import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Tittle = styled.h1`
  margin-bottom: 20px;
  text-transform: uppercase;
  color: white;
`;
export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
export const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
width: 230px;
  border: 1px solid #ccc;
  margin-top: 8px;
`;

export const Button = styled.button`
  background-color: #0080ff;
  color: white;
  padding: 12px 70px;
  border-radius: 4px;
  border: none;
  margin-top: 20px;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 20px;
`;
