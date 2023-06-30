import { createContext, ReactNode, useCallback, useState } from "react";

export interface ChatMessageItem {
  id: string;
  isMine: boolean;
  type: "text" | "audio" | "video";
  content: string | File;
}

interface State {
  latestVideoId?: string;
  messages: ChatMessageItem[];
}

const initialState: State = {
  messages: [],
};

interface Context extends State {
  onMessageAdd: (message: ChatMessageItem) => void;
  onMessageDelete: (messageId: ChatMessageItem["id"]) => void;
  onReset: () => void;
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
  onReset: () => {
    // do nothing
  },
});

export default function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState(initialState.messages);
  const [latestVideoId, setLatestVideoId] = useState<string>();

  const onMessageAdd = useCallback(
    (message: ChatMessageItem) => {
      if (message.type === "video") setLatestVideoId(message.id);
      setMessages((prev) => [...prev, message]);
    },
    [setMessages]
  );

  const onMessageDelete = useCallback(
    (messageId: ChatMessageItem["id"]) =>
      setMessages((prev) => prev.filter((message) => message.id !== messageId)),
    [setMessages]
  );

  const onReset = useCallback(() => setMessages([]), [setMessages]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        latestVideoId,
        onMessageAdd,
        onMessageDelete,
        onReset,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
