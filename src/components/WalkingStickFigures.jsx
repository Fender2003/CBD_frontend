// WalkingStickFigures.jsx

const WalkingStickFigure = ({
  color = "black",
}) => {
  return (
    <div
      style={{
        width: 60,
        height: 120,
        position: "relative",
        margin: "0 10px",
      }}
    >
      {/* Head */}
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: color,
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Body */}
      <div
        style={{
          width: 6,
          height: 50,
          background: color,
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Arms */}
      <div
        style={{
          position: "absolute",
          top: 25,
          left: "50%",
          width: 60,
          height: 6,
          background: color,
          transform: "translateX(-50%)",
        }}
      />

      {/* Left Leg */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: "50%",
          width: 6,
          height: 40,
          background: color,
          marginLeft: -10,
        }}
      />

      {/* Right Leg */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: "50%",
          width: 6,
          height: 40,
          background: color,
          marginLeft: 10,
        }}
      />
    </div>
  );
};

export { WalkingStickFigure };
