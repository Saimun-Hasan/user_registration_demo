import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import LoginView from "../src/pages/auth/register/LoginView.jsx";
import RegisterView from "../src/pages/auth/register/RegisterView.jsx";
import PrivateRoute from "./routes/components/PrivateRoutes.jsx";

import store from "./store";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// --------------------------Main---------------------------- //

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
  {
    path: "/login",
    element: <LoginView />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
