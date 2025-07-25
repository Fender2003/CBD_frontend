import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import player1 from "../assets/avatars/1.png";
import player2 from "../assets/avatars/2.png";
import player3 from "../assets/avatars/1.png";
import player4 from "../assets/avatars/2.png";

// Team setup
const baseTeam = [
  { img: player1 },
  { img: player2 },
  { img: player3 },
];

const teams = [
  { direction: "nw", players: baseTeam },
  { direction: "ne", players: baseTeam },
  { direction: "sw", players: baseTeam },
  { direction: "se", players: baseTeam },
];

const getStartPosition = (direction, offset) => {
  const distance = 300;
  switch (direction) {
    case "nw": return { x: -distance - offset, y: -distance - offset };
    case "ne": return { x: distance + offset, y: -distance - offset };
    case "sw": return { x: -distance - offset, y: distance + offset };
    case "se": return { x: distance + offset, y: distance + offset };
    default: return { x: 0, y: 0 };
  }
};

const TournamentSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const controls = useAnimation();
  const [revealed, setRevealed] = useState(false);

  // Scroll progress for scroll-driven pinning
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Control animation based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.1 && !revealed) {
        controls.start("visible");
        setRevealed(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, controls, revealed]);

  const cardVariants = {
    hidden: (custom) => {
      const { direction, index } = custom;
      const pos = getStartPosition(direction, index * 20);
      return {
        opacity: 0,
        x: pos.x,
        y: pos.y,
        rotate: 0,
        scale: 0.8,
      };
    },
    visible: (custom) => {
      const spacing = 100;
      let x = 0;
      let y = 0;

      switch (custom.direction) {
        case "nw":
          x = -spacing * custom.index;
          y = -spacing;
          break;
        case "ne":
          x = spacing * custom.index;
          y = -spacing;
          break;
        case "sw":
          x = -spacing * custom.index;
          y = spacing;
          break;
        case "se":
          x = spacing * custom.index;
          y = spacing;
          break;
      }

      return {
        opacity: 1,
        x,
        y,
        rotate: 0,
        scale: 1.1,
        transition: {
          delay: custom.index * 0.15 + custom.teamIndex * 0.2,
          duration: 0.6,
          ease: "easeOut",
        },
      };
    },
  };

  return (
    <section ref={sectionRef} className="h-[200vh] bg-white relative">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl w-full px-10">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">
              Clash of Teams, But Lined Up for Battle
            </h2>
            <p className="text-lg text-gray-600">
              Scroll down and watch the teams form up!
            </p>
          </div>

          <div className="relative h-[500px] w-full flex items-center justify-center">
            <div className="relative w-[180px] h-[180px]">
              {teams.map((team, teamIndex) =>
                team.players.map((player, index) => (
                  <motion.img
                    key={`${team.direction}-${index}`}
                    src={player.img}
                    custom={{ direction: team.direction, index, teamIndex }}
                    initial="hidden"
                    animate={controls}
                    variants={cardVariants}
                    className="absolute w-[100px] h-[140px] object-cover rounded-xl shadow-xl border-2 border-white"
                    style={{
                      top: 0,
                      left: 0,
                      zIndex: index + teamIndex * 10,
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentSection;
