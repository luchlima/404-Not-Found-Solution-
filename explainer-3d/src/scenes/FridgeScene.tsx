import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import * as THREE from "three";
import { beatAt, progressInBeat } from "../lib/script";

const CameraRig: React.FC = () => {
  const frame = useCurrentFrame();
  const { camera } = useThree();

  const camZ = interpolate(
    frame,
    [0, 180, 300, 450, 600, 960],
    [5.4, 4.8, 4.4, 4.0, 5.0, 5.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const camY = interpolate(frame, [0, 450, 700], [0.25, 0.1, 0.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camX = interpolate(
    frame,
    [0, 200, 450, 540, 720],
    [0, 0.35, 0.5, -1.35, -0.55],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  camera.position.set(camX, camY, camZ);
  camera.lookAt(0, 0, 0);
  return null;
};

const HeatParticle: React.FC<{
  index: number;
  mode: "inside" | "absorb" | "outside" | "cycle";
  frame: number;
  seed: number;
}> = ({ index, mode, frame, seed }) => {
  const angle = seed * Math.PI * 2;
  const radius = 0.28 + (seed % 1) * 0.45;
  const bob = Math.sin(frame * 0.09 + seed * 10) * 0.1;

  let position: [number, number, number] = [0, 0, 0];
  let scale = 0.12;
  let color = "#FF8A3D";
  let opacity = 0.95;

  if (mode === "inside") {
    position = [
      Math.cos(angle) * radius * 0.55,
      -0.35 + bob + (index % 6) * 0.22,
      0.05 + Math.sin(angle) * radius * 0.35,
    ];
  } else if (mode === "absorb") {
    const t = (frame * 0.022 + seed) % 1;
    const y = 0.95 - t * 2.0;
    const pull = interpolate(t, [0, 1], [radius, 0.08]);
    position = [
      Math.cos(angle) * pull,
      y + bob * 0.2,
      0.1 + Math.sin(angle) * pull * 0.3,
    ];
    opacity = interpolate(t, [0, 0.65, 1], [1, 0.85, 0.12]);
    scale = interpolate(t, [0, 1], [0.14, 0.05]);
  } else if (mode === "outside") {
    const t = (frame * 0.028 + seed) % 1;
    position = [
      -1.2 + Math.sin(angle) * 0.1,
      -0.85 + t * 1.85,
      0.05 + Math.cos(angle) * 0.14,
    ];
    color = "#FF6B2C";
    opacity = interpolate(t, [0, 0.15, 1], [0, 1, 0.08]);
    scale = 0.13;
  } else {
    const t = (frame * 0.016 + seed) % 1;
    const path = new THREE.EllipseCurve(0, 0, 1.2, 0.8, 0, Math.PI * 2, false, 0);
    const pt = path.getPoint(t);
    position = [pt.x, pt.y, 1.05];
    color = t < 0.5 ? "#FF8A3D" : "#7DD3FC";
    opacity = 0.9;
    scale = 0.11;
  }

  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 14, 14]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
};

const FoodBlock: React.FC<{
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}> = ({ position, size, color }) => (
  <mesh position={position}>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} roughness={0.55} metalness={0.05} />
  </mesh>
);

const FridgeBody: React.FC<{
  open: number;
  showCoils: boolean;
  glow: number;
}> = ({ open, showCoils, glow }) => {
  const doorAngle = interpolate(open, [0, 1], [0, -1.85]);
  const leftWallOpacity = interpolate(open, [0, 0.35, 1], [1, 0.35, 0.08]);

  return (
    <group>
      {/* fundo */}
      <mesh position={[0, 0, -0.52]}>
        <boxGeometry args={[1.55, 2.35, 0.08]} />
        <meshStandardMaterial color="#B7C9D8" metalness={0.25} roughness={0.4} />
      </mesh>

      {/* laterais / teto / piso — parede da frente some no cutaway */}
      <mesh position={[-0.78, 0, 0]}>
        <boxGeometry args={[0.08, 2.35, 1.1]} />
        <meshStandardMaterial
          color="#C9D8E6"
          metalness={0.3}
          roughness={0.35}
          transparent
          opacity={leftWallOpacity}
        />
      </mesh>
      <mesh position={[0.78, 0, 0]}>
        <boxGeometry args={[0.08, 2.35, 1.1]} />
        <meshStandardMaterial color="#C9D8E6" metalness={0.3} roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.18, 0]}>
        <boxGeometry args={[1.55, 0.08, 1.1]} />
        <meshStandardMaterial color="#C9D8E6" metalness={0.3} roughness={0.35} />
      </mesh>
      <mesh position={[0, -1.18, 0]}>
        <boxGeometry args={[1.55, 0.08, 1.1]} />
        <meshStandardMaterial color="#A8BAC8" metalness={0.25} roughness={0.4} />
      </mesh>

      {/* interior azul frio */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[1.4, 2.15, 0.95]} />
        <meshStandardMaterial
          color="#8EC8F0"
          emissive="#123A55"
          emissiveIntensity={0.35}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* prateleiras */}
      {[-0.55, 0.0, 0.55].map((y) => (
        <mesh key={y} position={[0, y, 0.05]}>
          <boxGeometry args={[1.25, 0.035, 0.9]} />
          <meshStandardMaterial color="#EAF5FF" transparent opacity={0.92} />
        </mesh>
      ))}

      {/* “alimentos” simplificados */}
      <FoodBlock position={[-0.35, -0.35, 0.15]} size={[0.35, 0.28, 0.28]} color="#F59E0B" />
      <FoodBlock position={[0.3, -0.32, 0.1]} size={[0.4, 0.22, 0.3]} color="#34D399" />
      <FoodBlock position={[-0.2, 0.2, 0.12]} size={[0.45, 0.2, 0.25]} color="#FB7185" />
      <FoodBlock position={[0.35, 0.75, 0.08]} size={[0.3, 0.25, 0.25]} color="#60A5FA" />

      {/* tubos internos (evaporador) */}
      {open > 0.2 &&
        [-0.4, 0, 0.4].map((y, i) => (
          <mesh key={i} position={[0, y, -0.35]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.42, 0.03, 8, 32]} />
            <meshStandardMaterial
              color="#93C5FD"
              emissive="#38BDF8"
              emissiveIntensity={0.5}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
        ))}

      {/* porta articulada */}
      <group position={[0.78, 0, 0.55]} rotation={[0, doorAngle, 0]}>
        <mesh position={[-0.78, 0, 0]}>
          <boxGeometry args={[1.55, 2.3, 0.09]} />
          <meshStandardMaterial color="#D5E4F0" metalness={0.35} roughness={0.32} />
        </mesh>
        <mesh position={[-0.25, 0.05, 0.08]}>
          <boxGeometry args={[0.08, 0.55, 0.06]} />
          <meshStandardMaterial color="#64748B" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>

      {/* serpentinas traseiras */}
      {showCoils &&
        Array.from({ length: 9 }).map((_, i) => {
          const y = -0.95 + i * 0.22;
          return (
            <mesh key={i} position={[-0.98, y, 0]} rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.3, 0.038, 8, 28]} />
              <meshStandardMaterial
                color="#FF7A45"
                emissive="#FF4D1A"
                emissiveIntensity={0.55 + glow * 1.1}
                metalness={0.55}
                roughness={0.22}
              />
            </mesh>
          );
        })}

      {/* compressor */}
      <mesh position={[0, -1.42, -0.1]}>
        <cylinderGeometry args={[0.3, 0.3, 0.38, 22]} />
        <meshStandardMaterial color="#475569" metalness={0.75} roughness={0.28} />
      </mesh>
    </group>
  );
};

const CycleArrows: React.FC<{ progress: number }> = ({ progress }) => {
  if (progress <= 0) return null;
  return (
    <group position={[0, 0, 1.15]} rotation={[0, 0, -progress * Math.PI * 2]}>
      <mesh>
        <torusGeometry args={[1.22, 0.03, 8, 64]} />
        <meshBasicMaterial color="#5EEAD4" transparent opacity={0.9} />
      </mesh>
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 1.22, Math.sin(a) * 1.22, 0]}
            rotation={[0, 0, a]}
          >
            <coneGeometry args={[0.09, 0.2, 8]} />
            <meshBasicMaterial color="#7DD3FC" />
          </mesh>
        );
      })}
    </group>
  );
};

const SceneContents: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = beatAt(frame);
  const p = progressInBeat(frame, beat);

  const open =
    beat.visual === "hook"
      ? 0
      : beat.visual === "cutaway"
        ? interpolate(p, [0, 1], [0, 1])
        : 1;

  const particleMode =
    beat.visual === "heat-out"
      ? "absorb"
      : beat.visual === "coils"
        ? "outside"
        : beat.visual === "cycle"
          ? "cycle"
          : "inside";

  const showParticles = beat.visual !== "hook";
  const showCoils =
    beat.visual === "coils" || beat.visual === "cycle" || beat.visual === "close";
  const coilGlow =
    beat.visual === "coils"
      ? p
      : beat.visual === "cycle" || beat.visual === "close"
        ? 0.75
        : 0;
  const cycleProgress =
    beat.visual === "cycle" ? p : beat.visual === "close" ? 1 : 0;

  const seeds = useMemo(
    () => Array.from({ length: 32 }, (_, i) => (Math.sin(i * 12.9898) * 43758.5453) % 1),
    [],
  );

  return (
    <>
      <CameraRig />
      <color attach="background" args={["#07111C"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#E8F6FF" />
      <directionalLight position={[-5, 2, -2]} intensity={0.55} color="#7DD3FC" />
      <pointLight position={[0.4, 0.4, 1.2]} intensity={0.8} color="#BDE7FF" />
      <pointLight position={[-1.2, 0, 0.4]} intensity={coilGlow * 2.6} color="#FF6B2C" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.65, 0]}>
        <circleGeometry args={[3.4, 48]} />
        <meshStandardMaterial color="#0B1724" transparent opacity={0.92} />
      </mesh>

      <FridgeBody open={open} showCoils={showCoils} glow={coilGlow} />
      <CycleArrows progress={cycleProgress} />

      {showParticles &&
        seeds.map((seed, i) => (
          <HeatParticle
            key={i}
            index={i}
            mode={particleMode}
            frame={frame}
            seed={Math.abs(seed)}
          />
        ))}
    </>
  );
};

export const FridgeScene: React.FC = () => {
  const { width, height } = useVideoConfig();

  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{ position: [0, 0.25, 5.4], fov: 42, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false }}
    >
      <SceneContents />
    </ThreeCanvas>
  );
};
