import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { beatAt, progressInBeat } from "../lib/script";

export const Caption: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = beatAt(frame);
  const p = progressInBeat(frame, beat);

  const opacity = interpolate(p, [0, 0.08, 0.85, 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(p, [0, 0.08], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 160,
        paddingLeft: 56,
        paddingRight: 56,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${y}px)`,
          background: "rgba(8, 14, 22, 0.72)",
          border: "1px solid rgba(140, 220, 255, 0.25)",
          borderRadius: 18,
          padding: "22px 28px",
          maxWidth: 920,
          backdropFilter: "blur(8px)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#F4FBFF",
            fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
            fontSize: 42,
            lineHeight: 1.25,
            fontWeight: 650,
            textAlign: "center",
            letterSpacing: "-0.02em",
          }}
        >
          {beat.text}
        </p>
      </div>
    </AbsoluteFill>
  );
};
