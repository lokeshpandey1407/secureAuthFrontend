import { Navigate, createBrowserRouter } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import App from "./App";
import Signin from "./Components/Signin/Signin";
import Home from "./Components/Home/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Navigate to="/signin" replace />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);

export default routes;
