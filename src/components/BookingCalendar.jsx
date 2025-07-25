import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const slots = [
  { time: "7:00 AM", booked: true },
  { time: "8:00 AM", booked: false },
  { time: "9:00 AM", booked: true },
  { time: "10:00 AM", booked: false },
  { time: "11:00 AM", booked: true },
  { time: "12:00 PM", booked: false },
  { time: "1:00 PM", booked: true },
  { time: "2:00 PM", booked: true },
  { time: "3:00 PM", booked: false },
  { time: "4:00 PM", booked: false },
];

const BookingScrollSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div ref={containerRef} className="h-[250vh]" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="sticky top-0 h-screen flex items-center justify-between px-10 py-20 gap-10">
        {/* Left Content */}
        <motion.div style={{ opacity, y: translateY }} className="w-1/2">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Court Slot</h2>
          <p className="text-lg text-gray-600">
            See how available times fill up as you scroll. Don't miss your chance — reserve the perfect slot before it's taken!
          </p>
        </motion.div>

        {/* Right Slot Animation */}
        <div className="w-1/2 space-y-3">
          {slots.map((slot, i) => (
            <motion.div
              key={i}
              style={{
                opacity: useTransform(scrollYProgress, [i / slots.length, (i + 1) / slots.length], [0, 1]),
                y: useTransform(scrollYProgress, [i / slots.length, (i + 1) / slots.length], [50, 0]),
              }}
              className={`px-6 py-3 rounded-lg border flex justify-between items-center text-lg shadow-md transition-colors duration-300 ${
                slot.booked ? "bg-red-100 border-red-300 text-red-700" : "bg-green-100 border-green-300 text-green-700"
              }`}
            >
              <span>{slot.time}</span>
              <span>{slot.booked ? "Booked" : "Available"}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingScrollSection;
