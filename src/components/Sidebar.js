import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <ul className="sidebar-list">
        <li>
          <Link to={"/products"}>Products</Link>
        </li>
        <li>
          <a href="#0">Categories</a>
        </li>
      </ul>
    </>
  );
}
export default Sidebar;