import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import pickleballImg from "../assets/pickleball.png";
import cricketImg from "../assets/cricket.jpg";

const sports = [
  { name: "Pickleball", path: "/dashboard/pickleball", image: pickleballImg },
  { name: "Cricket", path: "/dashboard/cricket", image: cricketImg },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSelect = (path) => {
    navigate(path);
  };

  return (
    <>
      <Header />

      <main className="pt-24 min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] px-6 py-12 flex flex-col items-center">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Welcome! Choose Your Sport
          </h1>
          <p className="text-lg text-gray-600 mb-12">Let the game begin 🚀</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {sports.map((sport, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(sport.path)}
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition w-full">
                  <img
                    src={sport.image}
                    alt={sport.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-gray-700">
                  {sport.name}
                </h2>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Dashboard;
