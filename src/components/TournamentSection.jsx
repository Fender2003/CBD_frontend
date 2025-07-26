import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

const getPositionOffset = (direction, index) => {
  const spacing = 80;
  switch (direction) {
    case "nw": return { x: -spacing * index, y: -spacing };
    case "ne": return { x: spacing * index, y: -spacing };
    case "sw": return { x: -spacing * index, y: spacing };
    case "se": return { x: spacing * index, y: spacing };
    default: return { x: 0, y: 0 };
  }
};

const TournamentSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} className="h-[250vh] bg-white relative">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl w-full px-10">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            style={{
              opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
              y: useTransform(scrollYProgress, [0.1, 0.3], [40, 0]),
            }}
          >
            <h2 className="text-4xl font-bold text-gray-800">
              Clash of Teams, But Lined Up for Battle
            </h2>
            <p className="text-lg text-gray-600">
              Scroll down and watch the teams form up!
            </p>
          </motion.div>

          {/* Right - Team Cards */}
          <div className="relative h-[500px] w-full flex items-center justify-center">
            <div className="relative w-[200px] h-[200px]">
              {teams.map((team, teamIndex) =>
                team.players.map((player, index) => {
                  const { x, y } = getPositionOffset(team.direction, index);

                  const opacity = useTransform(
                    scrollYProgress,
                    [0.2 + (teamIndex * 0.1), 0.3 + (teamIndex * 0.1)],
                    [0, 1]
                  );

                  const translateX = useTransform(
                    scrollYProgress,
                    [0.2 + (index * 0.05), 0.4 + (index * 0.05)],
                    [x * 1.5, x]
                  );

                  const translateY = useTransform(
                    scrollYProgress,
                    [0.2 + (index * 0.05), 0.4 + (index * 0.05)],
                    [y * 1.5, y]
                  );

                  return (
                    <motion.img
                      key={`${team.direction}-${index}`}
                      src={player.img}
                      className="absolute w-[100px] h-[140px] object-cover rounded-xl shadow-xl border-2 border-white"
                      style={{
                        top: 0,
                        left: 0,
                        x: translateX,
                        y: translateY,
                        opacity,
                        zIndex: index + teamIndex * 10,
                      }}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentSection;
