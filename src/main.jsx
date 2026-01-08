import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./pages/home/home.page.jsx";
import DashboardPage from "./pages/dashboard/dashboard.page.jsx";
import RootLayout from "./layouts/root.layout.jsx";
import DashboardLayout from "./layouts/dashboard.layout";
import ProtectedLayout from "./layouts/protected.layout";

// add the Store (React redux)
// The provide is the Dependancy injection
import { store } from "@/lib/redux/store.js";
import { Provider } from "react-redux";
import MainLayout from "./layouts/main.layout";
import { ClerkProvider } from "@clerk/clerk-react";
import SignInPage from "./pages/auth/sign-in-page";
import SignUpPage from "./pages/auth/sign-up-page";
import AuthorizedLayout from "./layouts/authorized.layout";
import AdminPage from "./pages/admin/admin.page";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* have to ability to call redux related Hooks and functions (provider tag)*/}
    <Provider store={store}>
      {/* Hight Order Components */}
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <Routes>
            {/* the RootLayout is the common UI part for Home and Dashboard*/}
            <Route element={<RootLayout />}>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
              </Route>
              <Route element={<ProtectedLayout />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                </Route>
                <Route element={<AuthorizedLayout />}>
                  <Route path="/admin/dashboard" element={<AdminPage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </ClerkProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
