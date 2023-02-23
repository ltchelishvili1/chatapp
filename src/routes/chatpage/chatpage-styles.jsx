import styled from "styled-components";

import { LoginPageContainer } from "../loginpage/LoginPage-component";

export const ChatContainer = styled(LoginPageContainer)`
  display: grid;
  grid-template-columns: 30% 70%;
  @media (max-width: 600px) {
    display: grid;
    flex-direction: column;
    width: 100%;
    height: 100%;
    grid-template-columns: 100%;
  }
  
`;
