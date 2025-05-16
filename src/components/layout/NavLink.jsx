import { NavLink as RouterNavLink } from "react-router-dom";

export default function NavBarLink({ to, children }) {
  const getNavLinkClass = (isActive) => `nav-link ${isActive ? "active" : ""}`;

  return (
    <li className="nav-item">
      <RouterNavLink to={to} className={({ isActive }) => getNavLinkClass(isActive)}>
        {children}
      </RouterNavLink>
    </li>
  );
}