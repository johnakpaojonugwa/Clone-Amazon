import Nav from "./Nav";
import SubHeader from "./SubHeader";
import SubFooter from "./SubFooter";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";

function UiLayout() {
  return (
    <>
      <Nav />
      <SubHeader />
      <Outlet />
      <SubFooter />
      <MainFooter />
    </>
  );
}

export default UiLayout;