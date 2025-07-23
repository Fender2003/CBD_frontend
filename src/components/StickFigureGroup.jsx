import React from "react";
import { motion } from "framer-motion";
import { WalkingStickFigure } from "./WalkingStickFigures";

export const StickFigureGroup = () => {
  return (
    <div className="flex items-end justify-center h-64 gap-20 relative">
      {/* Left jumper */}
      <motion.div
        initial={{ y: -300, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          scaleY: [1, 0.85, 1], // squish on landing
        }}
        transition={{
          delay: 1,
          type: "spring",
          stiffness: 300,
          damping: 15,
          duration: 0.6,
        }}
      >
        <WalkingStickFigure color="#3d33ffff" />
      </motion.div>

      {/* Static center figure */}
      <div>
        <WalkingStickFigure color="#444" />
      </div>

      {/* Right jumper */}
      <motion.div
        initial={{ y: -300, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          scaleY: [1, 0.85, 1], // squish on landing
        }}
        transition={{
          delay: 1.3,
          type: "spring",
          stiffness: 300,
          damping: 15,
          duration: 0.6,
        }}
      >
        <WalkingStickFigure color="#a22a6eff" />
      </motion.div>
    </div>
  );
};

