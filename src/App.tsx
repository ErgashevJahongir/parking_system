import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shops from "@/page/shops";
import Layout from "@/layout";
import ErrorPage from "@/components/error-page";
import NotFound from "@/components/not-found";
import ShopCreate from "@/page/shops/create";
import ShopUpdate from "@/page/shops/update";
import Login from "@/page/login";
import NotificationPage from "@/page/notification";
import DebitorStore from "@/page/debt-shops";
import ReportsStore from "@/page/reports-stores";
import { getBaseName } from "@/utils/get-basename";
import Admins from "@/page/admin";
import AdminCreate from "@/page/admin/create";
import AdminUpdate from "@/page/admin/update";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Shops />,
        },
        {
          path: "store/create",
          element: <ShopCreate />,
        },
        {
          path: "store/update/:id",
          element: <ShopUpdate />,
        },
        {
          path: "admin",
          element: <Admins />,
        },
        {
          path: "admin/create",
          element: <AdminCreate />,
        },
        {
          path: "admin/update/:id",
          element: <AdminUpdate />,
        },
        {
          path: "notification",
          element: <NotificationPage />,
        },
        {
          path: "debetor-stores",
          element: <DebitorStore />,
        },
        {
          path: "report-stores",
          element: <ReportsStore />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    basename: `/${getBaseName()}`,
  },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
