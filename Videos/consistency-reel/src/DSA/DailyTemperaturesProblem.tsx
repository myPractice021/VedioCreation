
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];

export const DailyTemperaturesProblem: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#090B10",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: 65,
        justifyContent: "center",
      }}
    >
      {/* Heading */}
      <div
        style={{
          fontSize: 58,
          fontWeight: 900,
          marginBottom: 25,
          opacity: titleOpacity,
        }}
      >
        Understand the Problem
      </div>

      <div
        style={{
          color: "#FF984D",
          fontSize: 30,
          marginBottom: 55,
        }}
      >
        Given an array of daily temperatures.
      </div>

      {/* Array heading */}
      <div
        style={{
          color: "#929AAA",
          fontSize: 25,
          letterSpacing: 4,
          marginBottom: 25,
        }}
      >
        INPUT ARRAY
      </div>

      {/* Animated array */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 15,
          marginBottom: 75,
        }}
      >
        {temperatures.map((temp, index) => {
          const progress = interpolate(
            frame,
            [15 + index * 5, 35 + index * 5],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          const isHighlighted = frame >= 80 && index === 0;

          return (
            <div
              key={index}
              style={{
                backgroundColor: isHighlighted
                  ? "#A64B16"
                  : "#222936",
                border: isHighlighted
                  ? "3px solid #FF984D"
                  : "2px solid #343D4C",
                borderRadius: 16,
                padding: "30px 10px",
                textAlign: "center",
                opacity: progress,
                transform: `translateY(${(1 - progress) * 70}px)`,
              }}
            >
              <div
                style={{
                  fontSize: 43,
                  fontWeight: 800,
                }}
              >
                {temp}
              </div>

              <div
                style={{
                  fontSize: 20,
                  color: "#AAB2C0",
                  marginTop: 10,
                }}
              >
                [{index}]
              </div>
            </div>
          );
        })}
      </div>

      {/* Code editor */}
      <div
        style={{
          backgroundColor: "#111722",
          borderRadius: 20,
          padding: 30,
          border: "1px solid #343D4C",
        }}
      >
        <div
          style={{
            color: "#FF984D",
            fontSize: 24,
            marginBottom: 25,
            letterSpacing: 3,
          }}
        >
          JAVA INPUT
        </div>

        {[
          "int[] temperatures = {",
          "    73, 74, 75, 71,",
          "    69, 72, 76, 73",
          "};",
        ].map((line, index) => {
          const lineOpacity = interpolate(
            frame,
            [65 + index * 12, 75 + index * 12],
            [0, 1],
            { extrapolateRight: "clamp" }
          );

          return (
            <div
              key={index}
              style={{
                color: index === 0 || index === 3
                  ? "#C792EA"
                  : "#C3E88D",
                fontSize: 29,
                fontFamily: "monospace",
                lineHeight: 1.8,
                opacity: lineOpacity,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 55,
          left: 65,
          color: "#778294",
          fontSize: 22,
          letterSpacing: 3,
        }}
      >
        JAVA DSA MASTERCLASS
      </div>
    </AbsoluteFill>
  );
};
