import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Messages from "../../components/messages/Messages";
import { ChatContext } from "../../contexts/chat-context";
import { UserContext } from "../../contexts/user-context";
import {
  db,
  getCategoriesAndDocuments,
  auth,
  signOutUser,
  getUsers,
  getImages,
} from "../../utils/firebase/firebase";
import { ChatContainer } from "./chatpage-styles";
import InputMess from "./input";

import logo from "./ZrTU3VK.jpeg";

const ChatPage = () => {
  const { currentUser } = useContext(UserContext);
  const { data, dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers(search);
      setUsers(response);
    };
    fetchUsers();
  }, [search]);

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
    }

    handleUserSelect(user);
  };

  const handleUserSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    {
      console.log(data);
    }
  };

  const SelectImage = (em) => {
    return images.filter((image) =>
      image.img_href.includes(em ? em : currentUser.email)
    )[0];
  };

  useEffect(() => {
    const fetchImages = async () => {
      setImages(await getImages());
    };
    fetchImages();
  }, []);
  console.log(SelectImage());
  return (
    <>
      <button onClick={signOutUser}>Log out</button>
      <ChatContainer>
        <UserSide>
          <Form>
            <UserName>
              <p>{currentUser?.displayName}</p>
              {SelectImage() && <Image src={SelectImage().img} alt="logo" />}
            </UserName>
            <Input
              type={"search"}
              name="email"
              value={search}
              onChange={handleSearch}
            />
          </Form>
          <UsersContainer>
            {users.map((user) => {
              if (user.username === currentUser.displayName) return;
              return (
                <UserContainer onClick={async () => await handleSelect(user)}>
                  <p>{user.username}</p>
                {SelectImage(user.email) &&  <Image src={SelectImage(user.email).img} alt="logo" />}
                </UserContainer>
              );
            })}
          </UsersContainer>
        </UserSide>
        <Messages SelectImage= {SelectImage} data={data} messages={messages} currentUser={currentUser} />
      </ChatContainer>
    </>
  );
};

export default ChatPage;

export const UserSide = styled.div`
  width: 100%;
  height: 100%;
`;

export const Form = styled.form`
  display: grid;
  place-items: center;
  height: 30%;
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
  height: 70%;
  background: #aba0a02d;
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
`;

export const Input = styled.input`
  width: 70%;
  height: 30px;
  background: transparent;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
`;
