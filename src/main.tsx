import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import QueryProvider from "./components/QueryProvider";
import ChatProvider from "./contexts/ChatContext";
import ConfigProvider from "./contexts/ConfigContext";
import SignDetection from "./pages/SignDetection";
import TextTranslator from "./pages/TextTranslator";
import { theme } from "./theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SignDetection />,
      },
      {
        path: "/text-translator",
        element: <TextTranslator />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ConfigProvider>
        <ChatProvider>
          <QueryProvider>
            <RouterProvider router={router} />
          </QueryProvider>
        </ChatProvider>
      </ConfigProvider>
    </ChakraProvider>
  </React.StrictMode>
);
