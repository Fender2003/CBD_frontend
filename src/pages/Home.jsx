import { useEffect, useState } from "react";
import Header from "../components/Header";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";
import WordScrollAnimation from "../components/WordScrollAnimation";
import bgImage from "../assets/homeBackground.jpg";
import RatingSection from "../components/RatingSection";
import TournamentsSection from "../components/TournamentSection"
import BookingCalendar from "../components/BookingCalendar"
import LoginPage from "../components/LoginPage"

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      <Header />

      {/* Hero Section */}
      <section
        className="h-screen w-full flex items-center justify-center text-white text-center bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to PickleConnect</h1>
          <p className="text-lg md:text-xl">Find. Match. Play.</p>
        </div>
      </section>

      {/* Scroll-triggered animated words */}
      {/* <WordScrollAnimation /> */}

      {/* Features Section */}
      <FeatureSection />



      <RatingSection/>



      <TournamentsSection/>



      <BookingCalendar/>



      <section className="h-screen bg-gray-200 flex items-center justify-center">
        <h1 className="text-4xl">Another Section</h1>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;