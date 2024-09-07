import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Components/Home/Home.jsx";
import SignIn from "./Components/SignIn and SignUp/SignIn.jsx";
import SignUp from "./Components/SignIn and SignUp/SignUp.jsx";
import Main from "./Layout/Main.jsx";
import CartOverview from "./Components/Cart/CartOverview.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import PrivateRoute from "./Components/Routes/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/Cart",
        element: <PrivateRoute><CartOverview></CartOverview></PrivateRoute>,
      },
    ],
  },
  {
    path: "/SignIn",
    element: <SignIn></SignIn>,
  },
  {
    path: "/SignUp",
    element: <SignUp></SignUp>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
