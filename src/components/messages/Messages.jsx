import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { UserContext } from "../../contexts/user-context";

import InputMess from "../../routes/chatpage/input";

import Img from "../../routes/chatpage/ZrTU3VK.jpeg";

const Messages = ({ data, messages }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <MessagesCont>
      <AuthedUser>
        {data.user.username && data.user.username.toUpperCase()}
      </AuthedUser>
      {currentUser && (
        <MessagesList>
          {messages.map((m, index) => (
            <div>
              <UserName isReceived={m.senderId !== currentUser.uid}>
                {m.senderId !== currentUser.uid ? (
                  <>
                    <UserNameText>{data.user.username}</UserNameText>
                  </>
                ) : (
                  <>
                    <UserNameText>you</UserNameText>
                  </>
                )}
              </UserName>
              <Text isReceived={m.senderId !== currentUser.uid}>
                <TextP>{m.text}</TextP>
              </Text>
            </div>
          ))}
        </MessagesList>
      )}
      <InputCont>
        <InputMess />
      </InputCont>
    </MessagesCont>
  );
};

export default Messages;

export const Image = styled.img`
  width: 30px;
  border: 1px solid #3d3d3d;
  border-radius: 50%;
  margin: 0 1rem;
`;

export const UserNameText = styled.p`
  padding: 0.2rem 0;
`;

export const TextP = styled.p`
  max-width: 300px;

  overflow-wrap: break-word;
`;

export const Text = styled.div`
  display: flex;
  color: #000000;
  align-items: center;
  margin: 0 10px;
  padding: 10px 10px;
  border-radius: 10px;
  justify-content: flex-end;
  box-sizing: border-box;
  border-radius: 1.125rem 1.125rem 0;
  background: linear-gradient(90deg, #4d4d4d 29%, #4d4d4d 25%, #3f72ffb8 83%);
  ${({ isReceived }) =>
    isReceived &&
    css`
      justify-content: flex-start;
      border-radius: 1.125rem 1.125rem 1.125rem 0;
      background: linear-gradient(
        90deg,
        #6b5b95 10%,
        #4d4d4d 84%,
        #4d4d4d 100%
      );
    `};
`;

export const UserName = styled(Text)`
  background: transparent;
  font-size: 12px;
  color: #000000;
  padding: 0 10px;
`;

export const MessagesCont = styled.div`
  width: 100%;
  height: 100%;
`;
export const AuthedUser = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  border: 3px solid #f0f0f0;
  border-top: none;
`;
export const MessagesList = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 3px solid #f0f0f0;
  border-top: none;
  padding: 10px 0;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #bec4c4;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
export const InputCont = styled.div`
  width: 100%;
`;

export const MesCont = styled.div`
  overflow: scroll;
`;
