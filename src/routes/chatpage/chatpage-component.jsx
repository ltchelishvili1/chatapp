import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import Messages from "../../components/messages/Messages";
import { ChatContext } from "../../contexts/chat-context";
import { UserContext } from "../../contexts/user-context";
import {
  db,
  signOutUser,
  getUsers,
  getImages,
} from "../../utils/firebase/firebase";
import { ChatContainer } from "./chatpage-styles";
import InputMess from "./input";

import noUser from "../../assets/nouser.jpg";

import { createLastMessages } from "./functions/functions";

import { BsSearch } from "react-icons/bs";

const ChatPage = () => {
  const { currentUser } = useContext(UserContext);
  const { data, dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [lasMessage, setLastMessage] = useState({});

  const [displayMessages, setDisplayMessages] = useState(false);

  useEffect(() => {
    dispatch({ type: "ISLOADING" });

    const messageUnsub = onSnapshot(
      doc(db, "chats", data.chatId),
      async (doc) => {
        try {
          if (doc.exists()) {
            const data = await doc.data();
            setMessages(data.messages);
          }
        } catch (error) {
          console.error("Error getting messages:", error);
        } finally {
          dispatch({ type: "ISLOADED" });
        }
      }
    );

    const getUsersAndChats = async () => {
      try {
        const chatDoc = doc(db, "userChats", currentUser.uid);
        const docSnap = await getDoc(chatDoc);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setChats(data);
        }

        const response = await getUsers(search);
        setUsers(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "ISLOADED" });
      }
    };

    getUsersAndChats();

    return () => {
      messageUnsub();
    };
  }, [db, data.chatId, getUsers, currentUser.uid, getDoc, onSnapshot, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.username,
            photoURL: "",
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: users.filter((us) => us.email === currentUser.email)[0]
              .username,
            photoURL: "",
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "ISLOADED" });
    }

    handleUserSelect(user);
  };

  const handleUserSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setDisplayMessages(true);
  };

  const SelectImage = (em) => {
    return images.filter((image) =>
      image.img_href.includes(em ? em : currentUser.email)
    )[0];
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getImages();
        setImages(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
    createLastMessages(users, chats, setLastMessage);
  }, [users, chats, messages]);

  return (
    <>
      <ChatContainer>
        {
          <UserSide isMobile={displayMessages}>
            <Form>
           
              <UserName>
              <LogOut onClick={signOutUser}>Log out</LogOut>
                <p>{currentUser?.displayName}</p>
                <Image
                  src={SelectImage() ? SelectImage().img : noUser}
                  alt="logo"
                />
              </UserName>
              
              <InputCont>
              
                <Input
                  type={"search"}
                  name="email"
                  value={search}
                  onChange={handleSearch}
                />
                <SearchIcon />
                
              </InputCont>
           
            </Form>
            <UsersContainer>
              {users.map((user, index) => {
                if (user.username === currentUser.displayName) return;
                if (index > 10) return;
                return (
                  <UserContainer onClick={async () => await handleSelect(user)}>
                    <div>
                      <p>{user.username}</p>
                      <span>{lasMessage[user.username]}</span>
                    </div>
                    <Image
                      src={
                        SelectImage(user.email)
                          ? SelectImage(user.email).img
                          : noUser
                      }
                      alt="logo"
                    />
                  </UserContainer>
                );
              })}
            </UsersContainer>
          </UserSide>
        }
        {displayMessages && (
          <Messages
            SelectImage={SelectImage}
            data={data}
            messages={messages}
            currentUser={currentUser}
            setDisplayMessages={setDisplayMessages}
          />
        )}
      </ChatContainer>
    </>
  );
};

export default ChatPage;

export const InputCont = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  position: relative;
`;

export const SearchIcon = styled(BsSearch)`
  position: absolute;
  right: 10px;
  opacity: 0.6;
`;

export const LogOut = styled.button`
  background-color: transparent;
  border: none;
  color: #ffffff3a;
  transition: transform .2s;
  cursor: pointer;
  text-transform: uppercase;
  z-index: 10;
  &:hover{
    transform: scale(1.1)
  }

  @media (max-width: 600px) {

  }

`;

export const UserSide = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 20% 80%;
  overflow: hidden;

  ${({ isMobile }) =>
    isMobile &&
    css`
      @media (max-width: 600px) {
        display: none;
      }
    `};
`;

export const Form = styled.form`
  display: grid;
  place-items: center;
`;

export const UserName = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

export const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  overflow-y: scroll;
  border-bottom: 3px solid #3d3d3d;
  border-radius: 10px;
  ::-webkit-scrollbar {
    width: 5px;
  }

  @media (max-width: 600px) {
    ::-webkit-scrollbar {
      width: 0px;
    }
  }

  ::-webkit-scrollbar-track {
    background: #aba0a02d;
  }

  ::-webkit-scrollbar-thumb {
    background: #aba0a02d;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  div {
    span {
      opacity: 0.6;
      font-size: 12px;
    }
  }
`;
export const Image = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid #3d3d3d;
  border-radius: 50%;
  margin: 0.3rem;
`;
export const UserContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 3px solid #3d3d3d;
  border-top: none;
  &:nth-child(1) {
    border: 3px solid #3d3d3d;
  }

  &:hover {
    background: #3d3d3d;
  }

  p {
    width: 70px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  background: transparent;
  border: 1px solid #a9a9a9;
  border-radius: 3px;
`;
