import NavBarLink from "./NavLink";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar custom-navbar">
      <div className="container d-flex align-items-center justify-content-between">
        <span className="navbar-brand mb-0 fw-bold custom-navbar-brand">
          Faculty Comparator
        </span>
        <ul className="navbar-nav flex-row gap-4 mb-0">
          <NavBarLink
            to="/"
            className="nav-link custom-navbar-link"
            activeStyle={{ color: "#4fc3f7" }}
          >
            List
          </NavBarLink>
          <NavBarLink
            to="/favorites"
            className="nav-link custom-navbar-link"
            activeStyle={{ color: "#4fc3f7" }}
          >
            Favorites
          </NavBarLink>
        </ul>
      </div>
    </nav>
  );
}
