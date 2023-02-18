import React, { useContext, useState } from "react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../utils/firebase/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { UserContext } from "../../contexts/user-context";
import { ChatContext } from "../../contexts/chat-context";
import styled from "styled-components";
import Input from "../../components/Input/Input-component";

import { BsFillImageFill } from "react-icons/bs";

const InputMess = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(UserContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log(error);
          // Handle error
        },
        async () => {
          // Upload complete, get download URL and update chat document
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
            console.log("Chat document updated with image URL");
          } catch (error) {
            console.log(error);
            // Handle error
          }
        }
      );
    } else {
      if (!text) return;
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <MainCont>
      <InputStyled
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <FormCont>
        <Input
          text={<BsFillImageFill size={25} />}
          type={"file"}
          name="image"
          styles={{
            padding: "0",
            background: "transparent",
            transform: "translateY(-3px)",
          }}
          onChange={(event) => setImg(event.target.files[0])}
        />
        {img && <img src={URL.createObjectURL(img)} />}
        <button onClick={handleSend}>Send</button>
      </FormCont>
    </MainCont>
  );
};

export default InputMess;

export const FormCont = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;

  button {
    min-width: 50px;
    min-height: 30px;
    background: #aba0a02d;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }

  img {
    width: 25px;
    height: 25px;
  }
`;

export const MainCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputStyled = styled.input`
  width: 100%;
  margin: auto;
  height: 45px;
  padding: 0 1rem;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #f0f0f0;
  border-top: none;
`;
