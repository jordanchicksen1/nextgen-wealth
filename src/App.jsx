import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TracksOverview from "./pages/TracksOverview";
import Track from "./pages/Track";
import SimulationsOverview from "./pages/SimulationsOverview";
import Simulation from "./pages/Simulation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/tracks" element={<TracksOverview />} />
        <Route path="/tracks/:id" element={<Track />} />
      <Route path="/simulations" element={<SimulationsOverview />} />
      <Route path="/simulation" element={<Simulation />} />
    </Routes>
  );
}

export default App;