import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
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
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-grow-1">
              <Routes>
                <Route path="/" element={<FacultiesList />} />
                <Route path="/favorites" element={<FavoritesFaculties />} />
                <Route path="/faculty/:id" element={<FacultyDetails />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </FavoritesProvider>
    </GlobalProvider>
  );
}

export default App;
