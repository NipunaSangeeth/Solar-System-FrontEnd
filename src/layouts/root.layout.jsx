// The Outlet is the react router component is help to
import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <>

      <Outlet />
    </>
  );
};

export default RootLayout;
