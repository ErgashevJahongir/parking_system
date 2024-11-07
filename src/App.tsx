import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shops from "@/page/orders";
import Layout from "@/layout";
import ErrorPage from "@/components/error-page";
import NotFound from "@/components/not-found";
import Login from "@/page/login";
import NotEndedOrders from "@/page/not-ended-orders";
import ReportsStore from "@/page/reports-stores";
import { getBaseName } from "@/utils/get-basename";
import Admins from "@/page/admin";
import ParkingType from "@/page/parking-type";

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
          path: "client",
          element: <Admins />,
        },
        {
          path: "parking-type",
          element: <ParkingType />,
        },
        {
          path: "debetor-stores",
          element: <NotEndedOrders />,
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
