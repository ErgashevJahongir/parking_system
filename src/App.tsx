import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/layout";
import ErrorPage from "@/components/error-page";
import NotFound from "@/components/not-found";
import Login from "@/page/login";
import NotEndedOrders from "@/page/not-ended-orders";
import { getBaseName } from "@/utils/get-basename";
import Admins from "@/page/admin";
import ParkingType from "@/page/parking-type";
import Parking from "./page/parkings";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Parking />,
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
          path: "not-ended-parking",
          element: <NotEndedOrders />,
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
