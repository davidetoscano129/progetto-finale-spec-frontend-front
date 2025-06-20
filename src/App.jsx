import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import PackageList from "./pages/PackageList";
import PackageFavs from "./pages/PackageFavs";
import PackageDetail from "./pages/PackageDetail";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Consulting Package List</NavLink>
          <NavLink to="/favorites">Favorites Consulting Packages</NavLink>
          <NavLink to="/id">Package Details</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<PackageList />} />
          <Route path="/favorites" element={<PackageFavs />} />
          <Route path="/id" element={<PackageDetail />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
