import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import SDGs from "./pages/SDGs";
import Contact from "./pages/Contact";
import SeaFreightPage from "./pages/SeaFreightPage";
import AirFreightPage from "./pages/AirFreightPage";
import CustomsClearancePage from "./pages/CustomsClearancePage";
import WarehousingPage from "./pages/WarehousingPage";
import CrossBorderPage from "./pages/CrossBorderPage";
import TruckingPage from "./pages/TruckingPage";
import ProjectCargoPage from "./pages/ProjectCargoPage";
import CollateralManagementPage from "./pages/CollateralManagementPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/sdgs" element={<SDGs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sea-freight" element={<SeaFreightPage />} />
        <Route path="/air-freight" element={<AirFreightPage />} />
        <Route path="/customs-clearance" element={<CustomsClearancePage />} />
        <Route path="/warehousing" element={<WarehousingPage />} />
        <Route path="/cross-border" element={<CrossBorderPage />} />
        <Route path="/trucking" element={<TruckingPage />} />
        <Route path="/project-cargo" element={<ProjectCargoPage />} />
        <Route path="/collateral-management" element={<CollateralManagementPage />} />
      </Routes>
    </BrowserRouter>
  );
}