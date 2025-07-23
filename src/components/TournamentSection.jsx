import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import player1 from "../assets/player1.png"; // Replace with your images
import player2 from "../assets/player2.png";
import player3 from "../assets/player3.png";
import player4 from "../assets/player4.png";

const cards = [
  { id: 1, img: player1 },
  { id: 2, img: player2 },
  { id: 3, img: player3 },
  { id: 4, img: player4 },
];

const TournamentSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const controls = useAnimation();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isInView && !revealed) {
      controls.start("visible");
      setRevealed(true);
    }
  }, [isInView, controls, revealed]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: i => ({
      opacity: 1,
      y: 0,
      rotate: Math.random() * 6 - 3,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center bg-white px-10 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl w-full">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">Host & Play in Thrilling Tournaments</h2>
          <p className="text-lg text-gray-600">
            Create or join exciting tournaments with just a few taps. Compete with dynamic groups, make new rivals, and rise to the top!
          </p>
        </div>
        <div className="relative h-[400px] w-full">
          {cards.map((card, i) => (
            <motion.img
              key={card.id}
              src={card.img}
              custom={i}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              className="absolute w-[150px] h-[200px] object-cover rounded-xl shadow-lg border-2 border-white"
              style={{
                top: i * 20,
                left: i * 40,
                zIndex: i,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TournamentSection;
