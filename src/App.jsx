import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import FacultiesList from "./pages/FacultiesList";
import FavoritesFaculties from "./pages/FavoritesFaculties";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Faculty List</NavLink>
          <NavLink to="/favorites">Your favorites Faculties</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<FacultiesList />} />
          <Route path="/favorites" element={<FavoritesFaculties />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
