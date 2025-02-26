import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// import PrivateRouter from "./PrivateRouter";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import MyBlog from "../pages/MyBlog";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Auth = lazy(() => import("../pages/Auth"));
const NewBlog = lazy(() => import("../pages/NewBlog"));
const Details = lazy(() => import("../pages/Details"));
const About = lazy(() => import("../pages/About"));
const Profile = lazy(() => import("../pages/Profile"));

const Layout = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: isSmallScreen ? "column-reverse" : "row",
      }}
    >
      <Navbar />
      <div
        style={{
          flex: 1,
          background: theme.palette.secondary.main,
          padding: "2rem 1rem",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

const initialValuesAuth={username:"", password:"", email:"", firstName:"", lastName:"", image:"", city:"", bio:""};

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth initialValues={initialValuesAuth}/>,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      {
        path: "/newBlog",
        element: <NewBlog/>,
      },
      {
        path: "/details/:blogID/",
        element: <Details />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile/>
      },
      {
        path: "/myBlog",
        element: <MyBlog/>
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", paddingTop: "50px" }}>
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
