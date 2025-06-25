import { BrowserRouter, Routes, Route } from "react-router-dom";
import PackageList from "./pages/PackageList";
import PackageFavs from "./pages/PackageFavs";
import PackageDetail from "./pages/PackageDetail";
import { GlobalProvider } from "./context/GlobalContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar />

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
