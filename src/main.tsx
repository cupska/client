import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./style/index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Auth from "./pages/auth/index.tsx";
import Registration from "./pages/auth/registration.tsx";
import Login from "./pages/auth/login.tsx";
import { Provider } from "react-redux";
import store from "./store.tsx";
import Produk from "./pages/dashboard/produk/index.tsx";
import MainLayout from "./components/layout/Main.layout.tsx";
import Profile from "./pages/dashboard/profile.tsx";
import AddProduct from "./pages/dashboard/produk/addProduct.tsx";
import MainToast from "./components/ui/Toast.tsx";
import UpdateProduct from "./pages/dashboard/produk/updateProduct.tsx";
import RequireAuth from "./pages/auth/requireAuth.tsx";
import Logout from "./pages/auth/logout.tsx";

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "auth",
    element: <Auth />,
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
    element: (
      <RequireAuth>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </RequireAuth>
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
