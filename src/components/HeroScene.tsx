import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/** One insulated cable with exposed copper strands at its tip. */
function Cable({ side }: { side: 1 | -1 }) {
  const group = useRef<THREE.Group>(null);

  const { jacketCurve, strands, jacketColor, glowColor } = useMemo(() => {
    const s = side;
    const pts = [
      new THREE.Vector3(4.6 * s, 0.55, -0.7),
      new THREE.Vector3(3.2 * s, 0.28, -0.35),
      new THREE.Vector3(2.0 * s, 0.05, 0.05),
      new THREE.Vector3(1.05 * s, -0.02, 0.42),
    ];
    const jacketCurve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.3);
    const end = jacketCurve.getPointAt(1);

    const strands: THREE.CatmullRomCurve3[] = [];
    const n = 11;
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n;
      const oy = Math.sin(a) * 0.085;
      const oz = Math.cos(a) * 0.06;
      strands.push(
        new THREE.CatmullRomCurve3(
          [
            new THREE.Vector3(end.x, end.y + oy, end.z + oz),
            new THREE.Vector3(0.72 * s, oy * 0.8 + Math.sin(a * 2) * 0.01, 0.62 + oz * 0.7),
            new THREE.Vector3(0.5 * s, oy * 0.45, 0.78 + oz * 0.4),
            new THREE.Vector3(0.3 * s, oy * 0.15, 0.86 + oz * 0.15),
          ],
          false,
          "catmullrom",
          0.35
        )
      );
    }
    return {
      jacketCurve,
      strands,
      jacketColor: s === 1 ? "#c8293a" : "#1663c9",
      glowColor: s === 1 ? "#ff5a4e" : "#4aa8ff",
    };
  }, [side]);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.z = Math.sin(clock.elapsedTime * 0.5 + side) * 0.02;
    }
  });

  const end = jacketCurve.getPointAt(1);
  const tangent = jacketCurve.getTangentAt(1).normalize();

  return (
    <group ref={group}>
      {/* Insulated jacket */}
      <mesh>
        <tubeGeometry args={[jacketCurve, 64, 0.17, 20, false]} />
        <meshPhysicalMaterial
          color={jacketColor}
          roughness={0.28}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.15}
          emissive={jacketColor}
          emissiveIntensity={0.12}
        />
      </mesh>
      {/* Cut-end collar */}
      <group position={end} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent)}>
        <mesh>
          <cylinderGeometry args={[0.178, 0.178, 0.06, 32]} />
          <meshStandardMaterial color="#0a0f16" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.145, 0.145, 0.062, 32]} />
          <meshPhysicalMaterial color={jacketColor} roughness={0.3} clearcoat={0.9} />
        </mesh>
      </group>
      {/* Copper strands */}
      {strands.map((c, i) => (
        <mesh key={i}>
          <tubeGeometry args={[c, 32, i % 4 === 0 ? 0.016 : 0.011, 6, false]} />
          <meshStandardMaterial
            color={["#e8a05c", "#c47a3a", "#ffd898", "#a8642f"][i % 4]!}
            metalness={0.85}
            roughness={0.28}
            emissive="#3a1c06"
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}
      <pointLight position={[1.6 * side, 0.4, 1.4]} intensity={2.2} distance={5} color={glowColor} />
    </group>
  );
}

/** Central crimp connector with pulsing energy. */
function Splice() {
  const light = useRef<THREE.PointLight>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pulse = 1.6 + Math.sin(t * 3.2) * 0.9 + Math.sin(t * 9.7) * 0.35;
    if (light.current) light.current.intensity = pulse * 2.4;
    if (core.current) {
      const m = core.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.9 + Math.sin(t * 3.2) * 0.5;
    }
  });
  return (
    <group position={[0, 0, 0.88]} rotation={[0, 0, Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[0.19, 0.19, 0.62, 40]} />
        <meshPhysicalMaterial color="#c98a4e" metalness={0.9} roughness={0.24} clearcoat={0.9} />
      </mesh>
      {[-0.26, 0.26].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.19, 0.024, 10, 40]} />
          <meshStandardMaterial color="#5a3018" metalness={0.88} roughness={0.3} />
        </mesh>
      ))}
      {[-0.12, 0, 0.12].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.192, 0.01, 8, 40]} />
          <meshStandardMaterial color="#7a4423" metalness={0.88} roughness={0.3} />
        </mesh>
      ))}
      <mesh ref={core} position={[0, 0, 0.16]}>
        <sphereGeometry args={[0.09, 20, 14]} />
        <meshStandardMaterial color="#fff3d0" emissive="#ffab3d" emissiveIntensity={1.2} />
      </mesh>
      <pointLight ref={light} position={[0, 0, 0.3]} intensity={4} distance={3.4} color="#ffb257" />
    </group>
  );
}

function SceneRig() {
  const rig = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!rig.current) return;
    const t = clock.elapsedTime;
    rig.current.rotation.y = Math.sin(t * 0.18) * 0.1 + pointer.x * 0.12;
    rig.current.rotation.x = Math.cos(t * 0.14) * 0.04 - pointer.y * 0.08;
    rig.current.position.y = Math.sin(t * 0.6) * 0.05;
  });
  return (
    <group ref={rig} rotation={[0.08, 0, -0.06]}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
        <Cable side={-1} />
        <Cable side={1} />
        <Splice />
      </Float>
      <Sparkles count={70} scale={[6, 2.4, 2]} position={[0, 0, 0.7]} size={3.2} speed={0.9} color="#ffc46b" opacity={0.75} />
      <Sparkles count={36} scale={[8, 3.5, 3]} position={[0, 0.4, -0.4]} size={2} speed={0.35} color="#6db4ff" opacity={0.5} />
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.25, 6.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#9cc4f0", "#0a0e18", 1.1]} />
      <directionalLight position={[-4, 5, 6]} intensity={2.4} color="#fff1d7" />
      <SceneRig />
    </Canvas>
  );
}
