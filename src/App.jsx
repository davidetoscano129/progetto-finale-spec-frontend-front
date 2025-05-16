import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import FacultiesList from "./pages/FacultiesList";
import FavoritesFaculties from "./pages/FavoritesFaculties";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<FacultiesList />} />
          <Route path="/favorites" element={<FavoritesFaculties />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
