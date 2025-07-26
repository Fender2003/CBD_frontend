import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Import icons
import findPlayersIcon from "../assets/icons/find-players.png";
import challengeTeamIcon from "../assets/icons/challenge-team.png";
import findCourtIcon from "../assets/icons/find-court.png";
import hostTournamentIcon from "../assets/icons/host-tournament.png";

const PickleballHub = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Find Players",
      path: "/dashboard/pickleball/find_players",
      bgColor: "bg-yellow-100",
      icon: findPlayersIcon,
    },
    {
      title: "Challenge a Team",
      path: "/dashboard/pickleball/challenge_team",
      bgColor: "bg-red-100",
      icon: challengeTeamIcon,
    },
    {
      title: "Find a Court",
      path: "/dashboard/pickleball/find_court",
      bgColor: "bg-green-100",
      icon: findCourtIcon,
    },
    {
      title: "Host a Tournament",
      path: "/dashboard/pickleball/host_tournament",
      bgColor: "bg-blue-100",
      icon: hostTournamentIcon,
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-10">🎾 Pickleball Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full px-4">
          {options.map((opt, index) => (
            <div
              key={index}
              onClick={() => navigate(opt.path)}
              className={`cursor-pointer ${opt.bgColor} hover:scale-105 transition transform p-8 rounded-xl shadow-md border border-gray-200 h-48 flex flex-col items-center justify-center text-center`}
            >
              <img src={opt.icon} alt={opt.title} className="h-[150px] w-[150px] object-contain" />
              <h2 className="text-xl font-bold text-gray-800">{opt.title}</h2>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PickleballHub;
