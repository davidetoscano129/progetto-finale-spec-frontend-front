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
          <div className="nav-container">
            <NavLink to="/">Consulting Packages</NavLink>
            <NavLink to="/favorites">Saved Packages</NavLink>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<PackageList />} />
          <Route path="/favorites" element={<PackageFavs />} />
          <Route path="/package/:id" element={<PackageDetail />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
