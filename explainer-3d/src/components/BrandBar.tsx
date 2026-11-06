import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { DURATION_IN_FRAMES } from "../lib/script";

export const BrandBar: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 20, DURATION_IN_FRAMES - 40, DURATION_IN_FRAMES],
    [0, 1, 1, 0.85],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 18px",
            borderRadius: 999,
            background: "rgba(6, 12, 20, 0.55)",
            border: "1px solid rgba(120, 210, 255, 0.2)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#5EEAD4",
              boxShadow: "0 0 12px #5EEAD4",
            }}
          />
          <span
            style={{
              color: "#D7F7FF",
              fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Explainer 3D · cutaway
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
