import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import PickleballHub from "./pages/PickleballHub";
import FindPlayersForm from "./pages/FindPlayersForm";

function App() {
  return (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/dashboard/pickleball" element={<PickleballHub />} />
    <Route path="/dashboard/pickleball/find_players" element={<FindPlayersForm />} />

  </Routes>
  );
}

export default App;
