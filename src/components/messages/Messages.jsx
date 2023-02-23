import React, { useContext, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { ChatContext } from "../../contexts/chat-context";
import { UserContext } from "../../contexts/user-context";
import { FiUsers } from "react-icons/fi";

import InputMess from "../../routes/chatpage/input";

const Messages = ({ data, messages, setDisplayMessages }) => {
  const myRef = useRef(null);

  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (myRef.current) myRef.current.scrollTop = myRef.current.scrollHeight;
  });

  const setDisplayImage = (img) => {
    dispatch({ type: "DISPLAY_IMAGE", payload: img });
  };

  const handleBack = () => {
    setDisplayMessages(false);
  };

  const { currentUser } = useContext(UserContext);

  return data.user.username ? (
    <MessagesCont>
      <AuthedUser>
        {data.user.username && data.user.username.toUpperCase()}
        {
          <span onClick={handleBack}>
            <CustFiUsers size={20} />
          </span>
        }
      </AuthedUser>
      {currentUser && (
        <MessagesList ref={myRef}>
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
                <div>
                  {m.img && (
                    <>
                      <MesImage
                        src={m.img}
                        onClick={() => setDisplayImage(m.img)}
                        alt="IMG"
                      />
                    </>
                  )}
                  {m.text && (
                    <TextP isReceived={m.senderId !== currentUser.uid}>
                      {m.text}
                    </TextP>
                  )}
                </div>
              </Text>
            </div>
          ))}
        </MessagesList>
      )}
      <InputCont>
        <InputMess />
      </InputCont>
    </MessagesCont>
  ) : (
    <NoUser>
      <p>No User Selected</p>
    </NoUser>
  );
};

export default Messages;

export const CustFiUsers = styled(FiUsers)`
  display: none;
  @media (max-width: 600px) {
    display: block;
  }
  
`

export const MesImage = styled.img`
  border-radius: 10px;
  cursor: pointer;
`;

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
  display: flex;
  justify-content: flex-end;
  ${({ isReceived }) =>
    isReceived &&
    css`
      justify-content: flex-start;
    `};
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
  @media (max-width: 600px) {
    background: linear-gradient(90deg, #3d3d3d 29%, #3d3d3d 25%, #3f72ffb8 83%);
  }

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

      @media (max-width: 600px) {
        background: linear-gradient(
          90deg,
          #6b5b95 10%,
          #3d3d3d 84%,
          #3d3d3d 100%
        );
      }
    `};

  img {
    width: 100px;
    height: 100px;
  }
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
  height: 60px;
  border: 3px solid #f0f0f0;
  border-top: none;
  border-right: none;
  @media (max-width: 600px) {
    border: none;
    position: fixed;
    top: 0;
    background: #4d4d4d;
  }

  span {
    position: absolute;
    display: grid;
    place-items: center;
    left: 10px;
  }
`;
export const MessagesList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 3px solid #f0f0f0;
  border-top: none;
  border-right: none;
  padding: 10px 0;
  overflow-y: scroll;
  height: calc(100vh - 270px);
  ::-webkit-scrollbar {
    width: 5px;
  }
  @media (max-width: 600px) {
    border: none;
    height: calc(100vh - 400px);
    transform: translateY(50px);
    z-index: -1;
  }

  &:hover {
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #bec4c4;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
  @media (max-height: 950px) {
    height: calc(100vh - 210px);
  }
  @media (max-height: 850px) {
    height: calc(100vh - 190px);
  }
  @media (max-height: 650px) {
    height: calc(100vh - 170px);
  }
  @media (max-height: 550px) {
    height: calc(100vh - 150px);
  }
  @media (max-height: 450px) {
    height: calc(100vh - 130px);
  }
  @media (min-width: 600px) {
    max-height: 50vh;
    @media (max-height: 1300px) {
      max-height: 55vh;
    }
    @media (max-height: 950px) {
      max-height: 53vh;
    }

    @media (max-height: 750px) {
      max-height: 52vh;
    }

    @media (max-height: 655px) {
      max-height: 50vh;
    }
    @media (max-height: 555px) {
      max-height: 48vh;
    }
    @media (max-height: 455px) {
      max-height: 46vh;
    }
    @media (max-height: 355px) {
      max-height: 40vh;
    }
    @media (max-height: 255px) {
      max-height: 30vh;
    }
  }
`;
export const InputCont = styled.div`
  width: 100%;
  z-index: 10;
`;

export const MesCont = styled.div`
  overflow: scroll;
`;

export const NoUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: white;
    padding: 1rem;
    border: 1px solid #3d3d3d;
    background-color: #3d3d3d;
  }
`;
