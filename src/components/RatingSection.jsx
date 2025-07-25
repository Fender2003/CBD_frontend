import { useRef } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
import { motion, useScroll, useTransform } from "framer-motion";

const data = [
  { match: "1", rating: 1200 },
  { match: "2", rating: 1180 },
  { match: "3", rating: 1210 },
  { match: "4", rating: 1250 },
  { match: "5", rating: 1220 },
  { match: "6", rating: 1275 },
  { match: "7", rating: 1290 },
];

const RatingSection = () => {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);

  // Animate the stroke based on scroll
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  const dashOffset = useTransform(scrollYProgress, [0, 1], [500, 0]);

  return (
    <div ref={wrapperRef} className="relative h-[250vh] bg-white"
    style={{ backgroundColor: "#f5f5f5" }}
>
      {/* Sticky Section */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 gap-12"
      >
        {/* Left Text */}
        <div className="w-full md:w-1/2 text-black space-y-4">
          <h2 className="text-4xl font-bold">
            Track Your Rating. Elevate Your Game.
          </h2>
          <p className="text-lg">
            Compete in rated matches and see your performance transform into real progress. Win more, rank higher, and watch your rating rise — match by match.
          </p>
        </div>

        {/* Right Graph */}
        <div className="w-full md:w-1/2 h-64 relative">
          {/* Overlay Animated Path */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 10 }}
          >
            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 500 200"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,100 L71,110 L142,90 L213,60 L284,80 L355,40 L426,20"
                fill="none"
                stroke="#10b981"
                strokeWidth="5"
                strokeDasharray="500"
                style={{
                  strokeDashoffset: dashOffset,
                }}
              />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RatingSection;
  