import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import TabletLayout from "./layouts/TabletLayout";
import AdminLayout from "./layouts/AdminLayout";

import AdminGuard from "./guards/AdminGuard";
import TableSessionGuard from "./guards/TableSessionGuard";

// Public
import LandingPage from "./pages/public/LandingPage";
import PublicMenuPage from "./pages/public/PublicMenuPage";
import ReservationPage from "./pages/public/ReservationPage";
import GalleryPage from "./pages/public/GalleryPage";
import ContactPage from "./pages/public/ContactPage";

// Tablet
import TabletHomePage from "./pages/tablet/TabletHomePage";
import TabletMenuPage from "./pages/tablet/TabletMenuPage";
import TabletOrdersPage from "./pages/tablet/TabletOrdersPage";

// Admin
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminMenuPage from "./pages/admin/AdminMenuPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/menu", element: <PublicMenuPage /> },
      { path: "/reserve", element: <ReservationPage /> },
      { path: "/gallery", element: <GalleryPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },

  {
    path: "/tablet",
    element: (
      <TableSessionGuard>
        <TabletLayout />
      </TableSessionGuard>
    ),
    children: [
      { index: true, element: <TabletHomePage /> },
      { path: "menu", element: <TabletMenuPage /> },
      { path: "orders", element: <TabletOrdersPage /> },
    ],
  },


  { path: "/admin/login", element: <AdminLoginPage /> },
  {
    path: "/admin",
    element: (
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "menu", element: <AdminMenuPage /> },
      { path: "orders", element: <AdminOrdersPage /> },
      { path: "users", element: <AdminUsersPage /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);
