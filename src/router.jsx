import { createBrowserRouter } from "react-router-dom";

import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import VoucherPage from "./pages/VoucherPage";
import DashboardPage from "./pages/DashboardPage";
import SalePage from "./pages/SalePage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import Layout from "./components/layout";
import VoucherDetailPage from "./pages/VoucherDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserProfileChangePasswordPage from "./pages/UserProfileChangePasswordPage";
import UserProfileChangeNamePage from "./pages/UserProfileChangeNamePage";
import UserProfileChangeImagePage from "./pages/UserProfileChangeImagePage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    children: [
      {
        index:true,
        element: <LoginPage />,
      },
      {
        path:"/register",
        element: <RegisterPage />,
      },
      {
        path:"dashboard",
        element: <Layout />,
        children:[
          {
            index:true,
            element: <DashboardPage />,
          },
          {
            path: "product",
            element: <ProductPage />,
          },
          {
            path: "product/create",
            element: <CreateProductPage />,
          },
          {
            path: "product/edit/:id",
            element: <EditProductPage />,
          },
          {
            path: "sale",
            element: <SalePage />,
          },
          {
            path: "voucher",
            element: <VoucherPage />,
          },
          {
            path: "voucher/detail/:id",
            element: <VoucherDetailPage />,
          },
          {
            path:"user-profile",
            children:[
              {
                index:true,
                element: <UserProfilePage />
              },
              {
                path:"user-change-password",
                element:<UserProfileChangePasswordPage />
              },
              {
                path:"user-change-name",
                element:<UserProfileChangeNamePage />
              },
              {
                path:"user-change-image",
                element:<UserProfileChangeImagePage />
              }
            ]
          }
        ]
      }
      
    ],
  },
]);

export default router;
