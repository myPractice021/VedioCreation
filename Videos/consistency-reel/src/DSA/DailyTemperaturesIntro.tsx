
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const DailyTemperaturesIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Main title animation
  const titleY = interpolate(
    frame,
    [0, 25],
    [180, 0],
    { extrapolateRight: "clamp" }
  );

  const titleOpacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // 2. Orange line animation
  const lineWidth = interpolate(
    frame,
    [25, 45],
    [0, 65],
    { extrapolateRight: "clamp" }
  );

  // 3. Subtitle animation
  const subtitleOpacity = interpolate(
    frame,
    [40, 55],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const subtitleY = interpolate(
    frame,
    [40, 55],
    [30, 0],
    { extrapolateRight: "clamp" }
  );

  // 4. Background floating animation
  const circleY = Math.sin(frame / 12) * 25;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#090909",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,120,30,0.18), transparent 70%)",
          transform: `translateY(${circleY}px)`,
        }}
      />

      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#FF8B36",
          top: "22%",
          left: "15%",
          opacity: 0.7,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#FF8B36",
          bottom: "25%",
          right: "18%",
          opacity: 0.6,
        }}
      />

      {/* Main title */}
      <div
        style={{
          textAlign: "center",
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 105,
            fontWeight: 900,
            letterSpacing: 8,
          }}
        >
          DAILY
        </div>

        <div
          style={{
            color: "#FF8B36",
            fontSize: 105,
            fontWeight: 900,
            letterSpacing: 4,
          }}
        >
          TEMPERATURES
        </div>
      </div>

      {/* Animated orange line */}
      <div
        style={{
          position: "absolute",
          top: "59%",
          width: `${lineWidth}%`,
          height: 5,
          backgroundColor: "#FF8B36",
          borderRadius: 10,
          boxShadow: "0 0 25px #FF8B36",
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: "64%",
          color: "#FFFFFF",
          fontSize: 42,
          fontWeight: 700,
          letterSpacing: 4,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          textAlign: "center",
        }}
      >
        SOLVE IT IN O(n)
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          color: "#888888",
          fontSize: 25,
          letterSpacing: 6,
          opacity: subtitleOpacity,
        }}
      >
        JAVA · MONOTONIC STACK
      </div>
    </AbsoluteFill>
  );
};
