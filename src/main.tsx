import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { theme } from "./theme";
import Layout from "./components/Layout";
import SignDetection from "./pages/SignDetection";
import ConfigProvider from "./contexts/ConfigContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SignDetection />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </ChakraProvider>
  </React.StrictMode>
);
