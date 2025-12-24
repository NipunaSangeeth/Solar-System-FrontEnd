import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./pages/home/home.page.jsx";
import DashboardPage from "./pages/dashboard/dashboard.page.jsx";
import RootLayout from "./layouts/root.layout.jsx";
import DashboardLayout from "./layouts/dashboard.layout";

// add the Store (React redux)
// The provide is the Dependancy injection
import { store } from "@/lib/redux/store.js";
import { Provider } from "react-redux";
import MainLayout from "./layouts/main.layout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* Hight Order Components */}
      <BrowserRouter>
        <Routes>
          {/* the RootLayout is the common UI part for Home and Dashboard*/}
          <Route element={<RootLayout />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
