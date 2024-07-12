import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import Streaming from "./pages/streaming/Streaming";
import Layout1 from "./components/Layout1/Layout1";
import "./style.scss";
import { DarkModeContext } from "./context/darkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout2 from "./components/Layout2/Layout2";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Admin from "./pages/admin/Admin";
import TripDetails from "./components/tripDetails/TripDetails";
import ThankYou from "./pages/thankyou/ThankYou";
import Trips from "./pages/trips/Trips";
import Booked from "./pages/booked/Booked";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();

  const LayoutHome = ({ children }) => (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      
      <div style={{ display: "flex" }}>
        <div style={{ flex: 6 }}>
          {children}
        </div>
       
      </div>
    </div>
  );

  const ProtectedRoute = ({ children, isGuestRoute = false }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    if (currentUser.role === "guest" && !isGuestRoute) {
      return <Navigate to="/register" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/travel",
      element: (
        <ProtectedRoute isGuestRoute={true}>
          <Layout1>
            <Streaming />
          </Layout1>
        </ProtectedRoute>
      ),
    },
    {
      path: "/trips",
      element: (
        <ProtectedRoute isGuestRoute={true}>
          <Layout1>
            <Trips />
          </Layout1>
        </ProtectedRoute>
      ),
    },
    {
      path: "/trips/:id",
      element: (
        <ProtectedRoute>
          <Layout2>
            <TripDetails />
          </Layout2>
        </ProtectedRoute>
      ),
    },
    {
      path: "/booked",
      element: (
        <ProtectedRoute isGuestRoute={true}>
          <Layout1>
            <Booked />
          </Layout1>
        </ProtectedRoute>
      ),
    },
    {
      path: "/thankyou",
      element: (
        <ProtectedRoute>
          <Layout2>
            <ThankYou />
          </Layout2>
        </ProtectedRoute>
      ),
    },
    {
      path: "/travel",
      element: (
        <ProtectedRoute>
          <LayoutHome>
            <Streaming />
          </LayoutHome>
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
