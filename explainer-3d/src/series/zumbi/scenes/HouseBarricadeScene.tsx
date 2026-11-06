import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { beatAt, progressInBeat } from "../scriptEp01";

const CameraRig: React.FC<{ visual: string; p: number }> = ({ visual, p }) => {
  const { camera } = useThree();
  const frame = useCurrentFrame();

  let x = 0;
  let y = 0.6;
  let z = 7.2;

  if (visual === "hook") {
    z = interpolate(p, [0, 1], [8.2, 7.0]);
    y = 0.85;
  } else if (visual === "door" || visual === "locks") {
    x = interpolate(p, [0, 1], [0, 0.2]);
    z = interpolate(p, [0, 1], [5.2, 4.2]);
    y = 0.35;
  } else if (visual === "furniture") {
    x = -0.15;
    z = interpolate(p, [0, 1], [5.0, 4.4]);
    y = 0.25;
  } else if (visual === "windows") {
    x = interpolate(p, [0, 1], [0.8, 1.4]);
    z = 5.0;
    y = 0.9;
  } else if (visual === "escape") {
    x = interpolate(p, [0, 1], [-0.4, -1.5]);
    z = interpolate(p, [0, 1], [6.0, 5.2]);
    y = 1.1;
  } else if (visual === "silence" || visual === "close") {
    x = 0;
    y = 1.0;
    z = interpolate(p, [0, 1], [7.5, 8.0]);
  }

  // leve respiração
  y += Math.sin(frame * 0.03) * 0.02;
  camera.position.set(x, y, z);
  camera.lookAt(0, 0.4, 0);
  return null;
};

const HouseShell: React.FC<{
  openCutaway: number;
  dark: number;
}> = ({ openCutaway, dark }) => {
  const wallColor = dark > 0.5 ? "#2A2420" : "#D4C4B0";
  const roofColor = dark > 0.5 ? "#1A1512" : "#8B4513";
  const frontOpacity = interpolate(openCutaway, [0, 1], [1, 0.08]);

  return (
    <group>
      {/* piso */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <circleGeometry args={[5, 48]} />
        <meshStandardMaterial color={dark > 0.5 ? "#0C0A08" : "#1A1612"} />
      </mesh>

      {/* paredes */}
      <mesh position={[0, 0.3, -1.4]}>
        <boxGeometry args={[4.2, 3.0, 0.18]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>
      <mesh position={[-2.1, 0.3, 0]}>
        <boxGeometry args={[0.18, 3.0, 2.8]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>
      <mesh position={[2.1, 0.3, 0]}>
        <boxGeometry args={[0.18, 3.0, 2.8]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* frente (cutaway) */}
      <mesh position={[0, 0.3, 1.4]}>
        <boxGeometry args={[4.2, 3.0, 0.18]} />
        <meshStandardMaterial
          color={wallColor}
          roughness={0.7}
          transparent
          opacity={frontOpacity}
        />
      </mesh>

      {/* telhado */}
      <mesh position={[0, 2.1, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[3.2, 1.4, 4]} />
        <meshStandardMaterial color={roofColor} roughness={0.65} />
      </mesh>

      {/* chão interno */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
        <planeGeometry args={[3.9, 2.6]} />
        <meshStandardMaterial color={dark > 0.5 ? "#1C1814" : "#C4B5A0"} />
      </mesh>
    </group>
  );
};

const Door: React.FC<{
  warn: number;
  locked: number;
}> = ({ warn, locked }) => {
  const doorColor = warn > 0.3 ? "#B45309" : "#6B4423";
  return (
    <group position={[0, -0.35, 1.42]}>
      <mesh>
        <boxGeometry args={[1.0, 2.0, 0.1]} />
        <meshStandardMaterial color={doorColor} roughness={0.55} metalness={0.1} />
      </mesh>
      {/* maçaneta */}
      <mesh position={[0.35, 0, 0.08]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial
          color={locked > 0.5 ? "#FBBF24" : "#A8A29E"}
          metalness={0.85}
          roughness={0.2}
          emissive={locked > 0.5 ? "#F59E0B" : "#000000"}
          emissiveIntensity={locked * 0.8}
        />
      </mesh>
      {/* trinco / corrente */}
      {locked > 0.2 && (
        <>
          <mesh position={[0.15, 0.15, 0.12]}>
            <boxGeometry args={[0.35, 0.08, 0.05]} />
            <meshStandardMaterial color="#78716C" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0.0, 0.05, 0.14]} rotation={[0, 0, 0.4]}>
            <torusGeometry args={[0.12, 0.025, 8, 16]} />
            <meshStandardMaterial color="#A8A29E" metalness={0.8} roughness={0.25} />
          </mesh>
        </>
      )}
      {/* X vermelho = não abra */}
      {warn > 0.4 && (
        <group position={[0, 0.4, 0.12]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.7, 0.08, 0.04]} />
            <meshBasicMaterial color="#EF4444" />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.7, 0.08, 0.04]} />
            <meshBasicMaterial color="#EF4444" />
          </mesh>
        </group>
      )}
    </group>
  );
};

const FurnitureBlock: React.FC<{ progress: number }> = ({ progress }) => {
  const sofaZ = interpolate(progress, [0, 1], [0.2, 1.05]);
  const fridgeX = interpolate(progress, [0, 1], [-1.4, -0.55]);
  return (
    <group>
      {/* sofá */}
      <mesh position={[0.15, -0.75, sofaZ]}>
        <boxGeometry args={[1.5, 0.55, 0.7]} />
        <meshStandardMaterial color="#3F5E4A" roughness={0.8} />
      </mesh>
      <mesh position={[0.15, -0.35, sofaZ - 0.2]}>
        <boxGeometry args={[1.5, 0.4, 0.25]} />
        <meshStandardMaterial color="#2F4A3A" roughness={0.8} />
      </mesh>
      {/* geladeira/armário */}
      <mesh position={[fridgeX, -0.2, 0.9]}>
        <boxGeometry args={[0.7, 1.7, 0.65]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.4} roughness={0.35} />
      </mesh>
    </group>
  );
};

const WindowBoards: React.FC<{ progress: number }> = ({ progress }) => {
  const boards = [0, 1, 2, 3];
  return (
    <group position={[1.55, 0.55, 0.2]}>
      {/* janela */}
      <mesh>
        <boxGeometry args={[0.08, 1.1, 0.9]} />
        <meshStandardMaterial
          color="#7DD3FC"
          transparent
          opacity={interpolate(progress, [0, 1], [0.55, 0.08])}
          emissive="#38BDF8"
          emissiveIntensity={interpolate(progress, [0, 1], [0.4, 0.05])}
        />
      </mesh>
      {boards.map((i) => {
        const appear = interpolate(progress, [i * 0.2, i * 0.2 + 0.25], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <mesh
            key={i}
            position={[0.08, -0.4 + i * 0.28, 0]}
            scale={[1, appear, 1]}
          >
            <boxGeometry args={[0.1, 0.2, 1.0]} />
            <meshStandardMaterial color="#92400E" roughness={0.75} />
          </mesh>
        );
      })}
    </group>
  );
};

const EscapePath: React.FC<{ progress: number }> = ({ progress }) => {
  const glow = 0.3 + progress * 0.7;
  return (
    <group>
      {/* seta no chão */}
      <mesh
        rotation={[-Math.PI / 2, 0, -0.4]}
        position={[-0.6, -1.1, -0.2]}
      >
        <planeGeometry args={[0.5, 2.2]} />
        <meshBasicMaterial color="#22C55E" transparent opacity={0.35 + progress * 0.4} />
      </mesh>
      <mesh position={[-1.5, 0.8, -1.0]}>
        <boxGeometry args={[0.7, 0.9, 0.08]} />
        <meshStandardMaterial
          color="#86EFAC"
          emissive="#22C55E"
          emissiveIntensity={glow}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* cone seta */}
      <mesh position={[-1.5, 0.3, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.18, 0.4, 8]} />
        <meshBasicMaterial color="#4ADE80" />
      </mesh>
    </group>
  );
};

const OutsideThreat: React.FC<{ intensity: number }> = ({ intensity }) => {
  if (intensity <= 0) return null;
  const seeds = useMemo(
    () => Array.from({ length: 5 }, (_, i) => (Math.sin(i * 9.1) * 10000) % 1),
    [],
  );
  const frame = useCurrentFrame();
  return (
    <group>
      {seeds.map((s, i) => {
        const x = -2.5 + i * 1.2 + Math.sin(frame * 0.04 + s * 8) * 0.15;
        const z = 2.6 + (s % 1) * 0.4;
        return (
          <mesh key={i} position={[x, -0.55, z]} scale={0.35 + (s % 1) * 0.15}>
            <capsuleGeometry args={[0.35, 0.7, 4, 8]} />
            <meshStandardMaterial
              color="#3F3A36"
              emissive="#7F1D1D"
              emissiveIntensity={0.25 * intensity}
              transparent
              opacity={0.55 * intensity}
            />
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
  const visual = beat.visual;

  const cutaway =
    visual === "hook" ? 0 : visual === "door" ? interpolate(p, [0, 1], [0, 0.5]) : 1;

  const warn = visual === "door" ? p : visual === "locks" ? 0.3 : 0;
  const locked =
    visual === "locks" ? p : ["furniture", "windows", "escape", "silence", "close"].includes(visual) ? 1 : 0;
  const furniture =
    visual === "furniture"
      ? p
      : ["windows", "escape", "silence", "close"].includes(visual)
        ? 1
        : 0;
  const boards =
    visual === "windows"
      ? p
      : ["escape", "silence", "close"].includes(visual)
        ? 1
        : 0;
  const escape =
    visual === "escape" ? p : visual === "silence" || visual === "close" ? 1 : 0;
  const dark =
    visual === "silence" ? interpolate(p, [0, 1], [0.2, 1]) : visual === "close" ? 0.85 : 0;
  const threat =
    visual === "hook" ? interpolate(p, [0, 1], [0.4, 1]) : visual === "door" ? 0.7 : 0.15;

  return (
    <>
      <CameraRig visual={visual} p={p} />
      <color attach="background" args={[dark > 0.5 ? "#050403" : "#120E0C"]} />
      <ambientLight intensity={interpolate(dark, [0, 1], [0.55, 0.12])} />
      <directionalLight
        position={[4, 8, 5]}
        intensity={interpolate(dark, [0, 1], [1.1, 0.2])}
        color="#FFE8D6"
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#F97316" />
      <pointLight
        position={[0, 1.2, 0.5]}
        intensity={interpolate(dark, [0, 1], [0.4, 0.05])}
        color="#FDBA74"
      />

      <HouseShell openCutaway={cutaway} dark={dark} />
      <Door warn={warn} locked={locked} />
      {furniture > 0 && <FurnitureBlock progress={furniture} />}
      {boards > 0 && <WindowBoards progress={boards} />}
      {escape > 0 && <EscapePath progress={escape} />}
      <OutsideThreat intensity={threat} />
    </>
  );
};

export const HouseBarricadeScene: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{ position: [0, 0.6, 7.2], fov: 40, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false }}
    >
      <SceneContents />
    </ThreeCanvas>
  );
};
