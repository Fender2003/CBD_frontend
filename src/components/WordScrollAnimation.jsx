import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// Define words + background color + slant direction
const wordSections = [
  { word: "Smash", fromRight: true, bg: "bg-lime-200", slant: "bottom" },
  { word: "Rally", fromRight: false, bg: "bg-white", slant: "top" },
  { word: "Repeat", fromRight: true, bg: "bg-sky-100", slant: "bottom" },
];

const WordBlock = ({ word, fromRight, bg, slant }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });


    useEffect(() => {
    if (inView) {
        controls.start("visible");
    } else {
        controls.start("hidden");
    }
    }, [inView, controls]);


  const variants = {
    hidden: {
      x: fromRight ? 150 : -150,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Slanted background using pseudo-clip paths
    const slantStyle =
    slant === "bottom"
        ? {
            clipPath: "polygon(0 0, 100% 0, 100% 85%, 0% 100%)",
            WebkitClipPath: "polygon(0 0, 100% 0, 100% 85%, 0% 100%)",
        }
        : {
            clipPath: "polygon(0 15%, 100% 0%, 100% 100%, 0% 100%)",
            WebkitClipPath: "polygon(0 15%, 100% 0%, 100% 100%, 0% 100%)",
        };

  return (
    <div
    className={`${bg} flex items-center justify-center`}
    style={{
        height: "40vh",
        ...(!bg.includes("white") && { color: "#1a1a1a" }),
        ...slantStyle,
    }}
    >

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="text-5xl md:text-7xl font-extrabold tracking-wide text-center"
      >
        {word}
      </motion.div>
    </div>
  );
};

const WordScrollAnimation = () => {
  return (
    <section>
      {wordSections.map((section, idx) => (
        <WordBlock
          key={idx}
          word={section.word}
          fromRight={section.fromRight}
          bg={section.bg}
          slant={section.slant}
        />
      ))}
    </section>
  );
};

export default WordScrollAnimation;
