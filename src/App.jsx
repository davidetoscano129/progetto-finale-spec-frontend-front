import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import FacultiesList from "./pages/FacultiesList";
import FavoritesFaculties from "./pages/FavoritesFaculties";
import FacultyDetails from "./pages/FacultyDetails";
import { GlobalProvider } from "./context/GlobalContext";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <GlobalProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<FacultiesList />} />
            <Route path="/favorites" element={<FavoritesFaculties />} />
            <Route path="/faculty/:id" element={<FacultyDetails />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </GlobalProvider>
  );
}

export default App;
