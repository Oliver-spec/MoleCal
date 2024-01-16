import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dilution from "./Dilution.jsx";
import FindMass from "./FindMass.jsx";
import FindVolume from "./FindVolume.jsx";
import FindConcentration from "./FindConcentration.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <FindMass />,
      },
      {
        path: "/findMass",
        element: <FindMass />,
      },
      {
        path: "/findConcentration",
        element: <FindConcentration />,
      },
      {
        path: "/findVolume",
        element: <FindVolume />,
      },
      {
        path: "/dilution",
        element: <Dilution />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
