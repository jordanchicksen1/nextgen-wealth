import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TracksOverview from "./pages/TracksOverview";
import Track from "./pages/Track";
import SimulationsOverview from "./pages/SimulationsOverview";
import Simulation from "./pages/Simulation";
import ProfileSetup from "./pages/ProfileSetup";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/tracks" element={<TracksOverview />} />
        <Route path="/tracks/:id" element={<Track />} />
      <Route path="/simulations" element={<SimulationsOverview />} />
      <Route path="/simulation" element={<Simulation />} />
      <Route path="/setup-profile" element={<ProfileSetup />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/profile" element={<Profile />}/>
    </Routes>
  );
}

export default App;