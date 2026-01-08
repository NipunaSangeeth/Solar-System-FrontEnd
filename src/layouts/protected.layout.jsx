import { useUser } from "@clerk/clerk-react";
import {Navigate, Outlet } from "react-router";

export default function ProtectedLayout() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;

  if(!isSignedIn){
    return<Navigate to="/sign-in"/>
  }

  return <Outlet />;
}

