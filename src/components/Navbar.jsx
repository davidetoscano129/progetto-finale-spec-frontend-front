import { NavLink } from "react-router-dom";
import "../style/components/Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/">Consulting Packages</NavLink>
      <NavLink to="/favorites">Saved Packages</NavLink>
    </nav>
  );
}