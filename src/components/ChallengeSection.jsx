import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChallengeSection = () => {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();
  const graphRef = useRef(null);

  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  });

  const rawData = [1200, 1250, 1230, 1300, 1350, 1380, 1420, 1400, 1450];
  const data = rawData.slice(0, progress).map((rating, index) => ({
    match: index + 1,
    rating,
  }));

  useEffect(() => {
    if (inView && progress < rawData.length) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= rawData.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [inView, progress]);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-white px-10 py-20 sticky top-0 z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl items-center">
        {/* Text Content */}
        <div className="text-left">
          <h2 className="text-4xl font-bold mb-4 text-black">
            Challenge a Team
          </h2>
          <p className="text-lg text-black">
            Bring your A-game and compete like chess masters. Win challenge
            matches to increase your rating and dominate the leaderboard. Each
            match affects your rank – play smart, rise high!
          </p>
        </div>

        {/* Graph */}
        <motion.div
          ref={graphRef}
          className="w-full h-64"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="match" />
              <YAxis domain={[1150, 1500]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4 }}
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default ChallengeSection;
