import React from "react";
import socketIO from "socket.io-client";
import Login from "./page/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./page/Register";
import Rooms from "./page/Rooms";
import Room from "./page/Room";
import "bootstrap/dist/css/bootstrap.min.css";

const socket = socketIO.connect("http://localhost:4000");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login socket={socket} />,
  },
  {
    path: "/register",
    element: <Register socket={socket} />,
  },
  {
    path: "/rooms",
    element: <Rooms socket={socket} />,
  },
  {
    path: "/room/:roomId",
    element: <Room socket={socket} />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
