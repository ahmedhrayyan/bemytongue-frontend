import { createContext, ReactNode, useCallback, useState } from "react";

export interface ChatMessageItem {
  id: string;
  isMine: boolean;
  type: "text" | "audio" | "video";
  content: string | File;
}

interface State {
  messages: ChatMessageItem[];
}

const initialState: State = {
  messages: [],
};

interface Context extends State {
  onMessageAdd: (message: ChatMessageItem) => void;
  onMessageDelete: (messageId: ChatMessageItem['id']) => void;
}

export const ChatContext = createContext<Context>({
  ...initialState,
  // default value for functions
  onMessageAdd: () => {
    // do nothing
  },
  onMessageDelete: () => {
    // do nothing
  },
});

export default function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState(initialState.messages);

  const onMessageAdd = useCallback(
    (message: ChatMessageItem) => setMessages((prev) => [...prev, message]),
    [setMessages]
  );

  const onMessageDelete = useCallback(
    (messageId: ChatMessageItem["id"]) =>
      setMessages((prev) => prev.filter((message) => message.id !== messageId)),
    [setMessages]
  );


  return (
    <ChatContext.Provider
      value={{
        messages,
        onMessageAdd,
        onMessageDelete
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
