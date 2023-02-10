import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthProvider from "../context/AuthProvider.js";
import AdminPage from "../pages/AdminPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AdminRouter from "./AdminRouter.jsx";
import NodeList from "../components/NodeList.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Note from "../components/Note.jsx";
import { noteLoader, notesLoader } from "../utils/noteUtils.js";
import { folderUtils } from "../utils/folderUtils.js";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            loader: folderUtils,
            children: [
              {
                element: <NodeList />,
                path: "folders/:folderId",
                loader: notesLoader,
                children: [
                  {
                    element: <Note />,
                    path: "note/:noteId",
                    loader: noteLoader,
                  },
                ],
              },
            ],
          },
          {
            element: <AdminRouter />,
            children: [
              {
                element: <AdminPage />,
                path: "/admin",
              },
            ],
          },
        ],
      },
    ],
  },
]);
