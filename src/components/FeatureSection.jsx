import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WalkingStickFigure } from "./WalkingStickFigures";
import { StickFigureGroup } from "./StickFigureGroup";

const FeatureSection = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = 1 - (top + height) / (windowHeight + height);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants for stick figures
  const playerVariants = {
    hidden: { 
      x: -100,
      opacity: 0,
      rotate: -10
    },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        delay: i * 0.3,
        type: "spring",
        damping: 10,
        stiffness: 100,
        mass: 0.5
      }
    }),
    hover: {
      y: -10,
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.5 }
    }
  };

const newPlayerVariants = {
  hidden: { 
    y: -200,
    opacity: 0,
    scaleY: 1,
    scaleX: 1
  },
  visible: (i) => ({
    y: [ -200, 20, -10, 0 ],         // Falling down, overshoot, bounce up, settle
    scaleY: [1, 0.6, 1.2, 1],        // Squish vertically when hitting ground
    scaleX: [1, 1.3, 0.8, 1],        // Stretch sideways when squishing
    opacity: 1,
    transition: {
      delay: 0.5 + i * 0.3,
      duration: 0.8,
      ease: "easeOut",
      type: "tween"
    }
  }),
};


  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: '200vh' }}
    >
        
      <section className="min-h-screen w-full relative bg-[#FDF6C8] z-50 overflow-hidden py-24 px-8 flex items-center justify-center sticky top-0">

  {/* <h1 className="absolute top-10 left-1/2 -translate-x-1/2 text-[120px] font-bold text-black/10 z-0 pointer-events-none select-none">
    Matchmaking
  </h1> */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-16 w-full max-w-6xl mx-auto px-6">
          {/* Text Section */}
          <div className="flex-1 text-center">

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold text-black-700 drop-shadow-sm text-left"
            >
              Short on Players? Not a Problem.
            </motion.h2>

            <AnimatePresence>
              {scrollProgress > 0.3 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 2 }}
                  className="text-lg md:text-xl mt-6 max-w-md text-gray-700 leading-relaxed text-left"
                >
                  Even if your full team can’t make it — we’ve got you. Whether you’re playing solo or showing up with friends, we’ll match you with others looking to play. You choose the time, and we’ll help form a complete group of 4 so you never miss a game.


                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Stick Figures */}
          <div className="flex-1 flex gap-4 justify-center items-end h-40">
            {/* First 2 players with walking animation */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={playerVariants}
            >
              <WalkingStickFigure color="#252d89ff" speed={1} />
            </motion.div>
            
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={playerVariants}
            >
              <WalkingStickFigure color="#252d89ff" speed={1.1} />
            </motion.div>

            {/* Additional players with different entrance */}
            <AnimatePresence>
              {scrollProgress > 0.25 && (
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  variants={newPlayerVariants}
                >
                  <WalkingStickFigure color="rgba(215, 196, 101, 1)" speed={0.9} />
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {scrollProgress > 0.30 && (
                <motion.div
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  variants={newPlayerVariants}
                >
                  <WalkingStickFigure color="rgba(215, 196, 101, 1" speed={1.2} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureSection;