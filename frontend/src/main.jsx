import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { router } from "./router";
import "./index.css";

import "./styles/vendor/bootstrap.min.css";
import "./styles/vendor/font-awesome.min.css";
import "./styles/vendor/animate.css";
import "./styles/vendor/owl.carousel.css";
import "./styles/vendor/owl.theme.default.min.css";
import "./styles/vendor/magnific-popup.css";
import "./styles/vendor/templatemo-style.css";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
