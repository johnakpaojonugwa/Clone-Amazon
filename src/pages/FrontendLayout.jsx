import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import SubHeader from "../components/SubHeader";
import SubFooter from "../components/SubFooter";
import MainFooter from "../components/MainFooter";

function FrontendLayout() {
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

export default FrontendLayout;
