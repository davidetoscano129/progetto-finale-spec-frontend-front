import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import MainLayout from "./layout/MainLayout";
import FacultiesList from "./pages/FacultiesList";
import FavoritesFaculties from "./pages/FavoritesFaculties";
import FacultyDetails from "./pages/FacultyDetails";

function App() {
  return (
    <GlobalProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<FacultiesList />} />
              <Route path="/favorites" element={<FavoritesFaculties />} />
              <Route path="/faculty/:id" element={<FacultyDetails />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </FavoritesProvider>
    </GlobalProvider>
  );
}

export default App;
