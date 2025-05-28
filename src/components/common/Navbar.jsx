import NavBarLink from "./NavBarLink";
import "../../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar custom-navbar fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <a href="/" className="navbar-brand mb-0 custom-navbar-brand">
          Faculty Comparator
        </a>
        <ul className="navbar-nav flex-row gap-3 mb-0">
          <NavBarLink to="/" className="nav-link custom-navbar-link">
            List
          </NavBarLink>
          <NavBarLink to="/favorites" className="nav-link custom-navbar-link">
            Favorites
          </NavBarLink>
        </ul>
      </div>
    </nav>
  );
}
