import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { beatAt, progressInBeat, DURATION_IN_FRAMES } from "../scriptEp01";

export const SeriesBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: 64,
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
            background: "rgba(12, 8, 6, 0.7)",
            border: "1px solid rgba(255, 140, 90, 0.35)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#F97316",
              boxShadow: "0 0 12px #F97316",
            }}
          />
          <span
            style={{
              color: "#FFE8D6",
              fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Abrigo em Casa · Ep. 01
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Caption: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = beatAt(frame);
  const p = progressInBeat(frame, beat);
  const opacity = interpolate(p, [0, 0.06, 0.88, 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(p, [0, 0.06], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 150,
        paddingLeft: 48,
        paddingRight: 48,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${y}px)`,
          background: "rgba(10, 6, 4, 0.78)",
          border: "1px solid rgba(255, 160, 100, 0.28)",
          borderRadius: 18,
          padding: "22px 26px",
          maxWidth: 940,
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#FFF5EC",
            fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
            fontSize: 40,
            lineHeight: 1.28,
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

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const p = frame / DURATION_IN_FRAMES;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 80,
          right: 80,
          height: 4,
          borderRadius: 999,
          background: "rgba(255,255,255,0.12)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${p * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #F97316, #FBBF24)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
