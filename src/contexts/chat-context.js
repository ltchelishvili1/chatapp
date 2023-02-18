import { createContext, useContext, useReducer } from "react";
import { UserContext } from "./user-context";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    displayImage: "",
    isLoading: false,
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          ...state,
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case "DISPLAY_IMAGE":
        return {
          ...state,
          displayImage: action.payload,
        };

      case "ISLOADING":
        return {
          ...state,
          isLoading: true,
        };

      case "ISLOADED":
        return {
          ...state,
          isLoading: false,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
