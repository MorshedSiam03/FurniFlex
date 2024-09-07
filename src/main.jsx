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
import Products from "./Components/Products/Products.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Products></Products>,
      },
      {
        path: "/home",
        element: <Products></Products>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/categories",
        element: <Products></Products>,
      },
      {
        path: "/custom",
        element: <Products></Products>,
      },
      {
        path: "/blog",
        element: <Products></Products>,
      },
      {
        path: "/Cart",
        element: <PrivateRoute><CartOverview></CartOverview></PrivateRoute>,
        loader: ({params}) => fetch(`https://furni-flex-server-fawn.vercel.app/cart`)
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
