export const createLastMessages = (users, chats, setLastMessage) => {
    let newObj = {};
    users.forEach(
      (user) =>
        (newObj = {
          ...newObj,
          [user.username]:
            chats[Object.keys(chats).filter((chat) => chat.includes(user.uid))[0]]
              ?.lastMessage?.text,
        })
    );
  
    setLastMessage(newObj);
  };