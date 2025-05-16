import NavBarLink from "./NavLink";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand">Faculty Comparator</span>

        <ul className="navbar-nav flex-row gap-3">
          <NavBarLink to="/">List</NavBarLink>
          <NavBarLink to="/favorites">Favorites</NavBarLink>
        </ul>
      </div>
    </nav>
  );
}
