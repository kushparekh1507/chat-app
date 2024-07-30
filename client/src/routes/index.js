import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Message from "../components/Message";
import AuthLayout from "../layout";
import ForgotPassword from "../pages/ForgotPassword";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ":userId",
            element: <Message />
          }
        ]
      },
      {
        path: "register",
        element: <AuthLayout><Register /></AuthLayout>
      },
      {
        path: "login",
        element: <AuthLayout><Login /></AuthLayout>
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      }
    ]
  }
])

export default route