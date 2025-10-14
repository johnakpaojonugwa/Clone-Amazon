import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const SubHeader = () => (
  <div className="bg-[#232f3e] text-white text-sm py-2 px-4 flex items-center gap-4 overflow-x-auto">
    <FaBars />
    <span className="whitespace-nowrap">All</span>
    <Link to={"/shop"}>  <span className="whitespace-nowrap hover:underline text-blue">Today's Deals</span></Link>
    <span className="whitespace-nowrap">Registry</span>
    <span className="whitespace-nowrap">Prime Video</span>
    <span className="whitespace-nowrap">Gift Cards</span>
    <span className="whitespace-nowrap">Customer Service</span>
    <span className="whitespace-nowrap">Sell</span>
  </div>
);

export default SubHeader