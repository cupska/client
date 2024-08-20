import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import { Provider } from "react-redux";
import store from "./store.tsx";
import MainToast from "./components/ui/Toast.tsx";
import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./components/layout/Main.layout.tsx";
import App from "./pages/App.tsx";
import Auth from "./pages/auth/index.tsx";
import Login from "./pages/auth/login.tsx";
import Logout from "./pages/auth/logout.tsx";
import Registration from "./pages/auth/registration.tsx";
import AddProduct from "./pages/dashboard/produk/addProduct.tsx";
import Produk from "./pages/dashboard/produk/index.tsx";
import UpdateProduct from "./pages/dashboard/produk/updateProduct.tsx";
import Profile from "./pages/dashboard/profile.tsx";

type SessionType = {
  data: { isAuthenticated: boolean; id: string; fullname: string };
  error: { message: string } | null;
};

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      await fetch(import.meta.env.VITE_API_URL + "/auth/session", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          const { data }: SessionType = res;
          if (data?.isAuthenticated) throw redirect("/dashboard/produk");
        });
      throw redirect("/auth/login");
      return null;
    },
  },
  {
    path: "kurma",
    element: <div>kimak</div>,
  },
  {
    path: "auth",
    element: <Auth />,
    loader: async () => {
      await fetch(import.meta.env.VITE_API_URL + "/auth/session", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          const { data }: SessionType = res;
          if (data?.isAuthenticated) throw redirect("/dashboard/produk");
        });
      return null;
    },
    children: [
      {
        path: "registration",
        element: <Registration />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "dashboard", //Protected Route
    loader: async () => {
      await fetch(import.meta.env.VITE_API_URL + "/auth/session", {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) throw redirect("/auth/login");
      });
      return null;
    },
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        path: "produk",
        element: <Produk />,
      },
      {
        path: "produk/tambah-produk",
        element: <AddProduct />,
      },
      {
        path: "produk/ubah-produk/:productId",
        element: <UpdateProduct />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainToast />
      <RouterProvider router={rootRouter} />
    </Provider>
  </React.StrictMode>
);
