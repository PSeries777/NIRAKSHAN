import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useWorkforce } from '../../context/WorkforceContext';

// Stylized 3D Worker / Humanoid Figure
const StylizedHuman: React.FC<{
  position: [number, number, number];
  color: string;
  hatColor?: string;
  toolType?: 'wrench' | 'roller' | 'clipboard' | 'wire' | 'level';
  scale?: number;
}> = ({ position, color, hatColor = '#F59E0B', toolType, scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Head */}
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#FBD5B5" roughness={0.4} />
      </mesh>

      {/* Worker Hardhat / Cap */}
      <mesh position={[0, 1.58, 0]}>
        <cylinderGeometry args={[0.26, 0.28, 0.12, 24]} />
        <meshStandardMaterial color={hatColor} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Helmet Brim */}
      <mesh position={[0, 1.52, 0.06]}>
        <cylinderGeometry args={[0.3, 0.3, 0.03, 24]} />
        <meshStandardMaterial color={hatColor} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Body / Torso (Rounded Box) */}
      <RoundedBox args={[0.5, 0.65, 0.3]} radius={0.08} smoothness={4} position={[0, 0.9, 0]}>
        <meshStandardMaterial color={color} roughness={0.5} />
      </RoundedBox>

      {/* High-visibility vest stripes */}
      <mesh position={[0, 0.9, 0.16]}>
        <planeGeometry args={[0.38, 0.08]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.2} />
      </mesh>

      {/* Legs (Soft cuboids) */}
      <RoundedBox args={[0.16, 0.55, 0.18]} radius={0.04} smoothness={4} position={[-0.14, 0.28, 0]}>
        <meshStandardMaterial color="#1E293B" roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.16, 0.55, 0.18]} radius={0.04} smoothness={4} position={[0.14, 0.28, 0]}>
        <meshStandardMaterial color="#1E293B" roughness={0.7} />
      </RoundedBox>

      {/* Boots */}
      <RoundedBox args={[0.17, 0.12, 0.26]} radius={0.04} smoothness={4} position={[-0.14, 0.06, 0.04]}>
        <meshStandardMaterial color="#0F172A" roughness={0.8} />
      </RoundedBox>
      <RoundedBox args={[0.17, 0.12, 0.26]} radius={0.04} smoothness={4} position={[0.14, 0.06, 0.04]}>
        <meshStandardMaterial color="#0F172A" roughness={0.8} />
      </RoundedBox>

      {/* Arms & Tools */}
      {toolType === 'clipboard' && (
        <group position={[0.26, 0.85, 0.2]} rotation={[0.4, -0.3, 0]}>
          <RoundedBox args={[0.22, 0.3, 0.03]} radius={0.01} smoothness={2}>
            <meshStandardMaterial color="#0284C7" />
          </RoundedBox>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.18, 0.24]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      )}

      {toolType === 'wrench' && (
        <group position={[0.32, 0.8, 0.15]} rotation={[0.2, 0, 0.6]}>
          <cylinderGeometry args={[0.03, 0.03, 0.45, 12]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.2} />
        </group>
      )}

      {toolType === 'roller' && (
        <group position={[0.32, 0.9, 0.15]} rotation={[0.3, 0.2, 0.3]}>
          {/* Handle */}
          <cylinderGeometry args={[0.02, 0.02, 0.5, 12]} />
          <meshStandardMaterial color="#0268CA" roughness={0.4} />
          {/* Paint Cylinder */}
          <mesh position={[0, 0.25, 0.08]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.22, 16]} />
            <meshStandardMaterial color="#10B981" roughness={0.9} />
          </mesh>
        </group>
      )}
    </group>
  );
};

// Floating Holographic Job Card
const HolographicJobCard: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <group position={position}>
        <RoundedBox args={[1.3, 0.9, 0.08]} radius={0.08} smoothness={4}>
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.3}
            roughness={0.15}
            thickness={0.5}
            metalness={0.1}
            clearcoat={1}
          />
        </RoundedBox>

        {/* Card Header Stripe */}
        <mesh position={[0, 0.3, 0.045]}>
          <planeGeometry args={[1.15, 0.16]} />
          <meshStandardMaterial color="#0268CA" />
        </mesh>

        {/* Text lines (simulated stylized bars) */}
        <mesh position={[-0.15, 0.1, 0.045]}>
          <planeGeometry args={[0.8, 0.06]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>
        <mesh position={[-0.25, -0.05, 0.045]}>
          <planeGeometry args={[0.6, 0.05]} />
          <meshStandardMaterial color="#64748B" />
        </mesh>

        {/* Status Pill */}
        <mesh position={[0.35, -0.22, 0.045]}>
          <planeGeometry args={[0.4, 0.12]} />
          <meshStandardMaterial color="#16A34A" />
        </mesh>
      </group>
    </Float>
  );
};

// Floating AI Crystal Orb
const AICompanionOrb: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (orbRef.current) {
      orbRef.current.rotation.y += delta * 0.8;
      orbRef.current.rotation.x += delta * 0.4;
    }
  });

  return (
    <Float speed={3.5} rotationIntensity={1} floatIntensity={1.2}>
      <group position={position}>
        <mesh ref={orbRef}>
          <octahedronGeometry args={[0.26, 0]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
        {/* Glow halo */}
        <mesh scale={1.2}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshBasicMaterial color="#7DD3FC" transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

// 3D Basic Feature Keypad Phone
const BasicKeypadPhone3D: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={position} rotation={[0.2, -0.4, 0.1]}>
        {/* Phone Body */}
        <RoundedBox args={[0.6, 1.1, 0.14]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#1E293B" roughness={0.4} />
        </RoundedBox>

        {/* Small Screen (Green LCD) */}
        <mesh position={[0, 0.22, 0.075]}>
          <planeGeometry args={[0.46, 0.38]} />
          <meshStandardMaterial color="#86EFAC" roughness={0.3} />
        </mesh>

        {/* Simulated SMS text on screen */}
        <mesh position={[0, 0.22, 0.078]}>
          <planeGeometry args={[0.38, 0.05]} />
          <meshStandardMaterial color="#14532D" />
        </mesh>

        {/* Keypad Grid (Buttons) */}
        {[-0.08, -0.22, -0.36].map((y, row) => (
          <group key={row} position={[0, y, 0.08]}>
            <RoundedBox args={[0.1, 0.08, 0.02]} radius={0.01} smoothness={2} position={[-0.14, 0, 0]}>
              <meshStandardMaterial color="#334155" />
            </RoundedBox>
            <RoundedBox args={[0.1, 0.08, 0.02]} radius={0.01} smoothness={2} position={[0, 0, 0]}>
              <meshStandardMaterial color="#334155" />
            </RoundedBox>
            <RoundedBox args={[0.1, 0.08, 0.02]} radius={0.01} smoothness={2} position={[0.14, 0, 0]}>
              <meshStandardMaterial color="#334155" />
            </RoundedBox>
          </group>
        ))}
      </group>
    </Float>
  );
};

// Main Composition Scene
const Scene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 6]} intensity={1.4} castShadow />
      <directionalLight position={[-5, 4, -2]} intensity={0.5} color="#BAE6FD" />
      <pointLight position={[0, 3, 2]} intensity={0.8} color="#FDE68A" />

      {/* Recruiter (Center-Left) */}
      <StylizedHuman
        position={[-1.2, -0.6, 0.2]}
        color="#0268CA"
        hatColor="#0A3B6F"
        toolType="clipboard"
        scale={1.05}
      />

      {/* Skilled Painter Worker (Right) */}
      <StylizedHuman
        position={[1.1, -0.6, 0.4]}
        color="#10B981"
        hatColor="#F59E0B"
        toolType="roller"
        scale={1}
      />

      {/* Skilled Plumber Worker (Back-Left) */}
      <StylizedHuman
        position={[-0.2, -0.5, -0.8]}
        color="#0284C7"
        hatColor="#EA580C"
        toolType="wrench"
        scale={0.9}
      />

      {/* Holographic Job Card (Floating Center-Top) */}
      <HolographicJobCard position={[0, 0.9, 0.2]} />

      {/* 3D Keypad Phone (Right Foreground) */}
      <BasicKeypadPhone3D position={[1.8, 0.2, 0.6]} />

      {/* AI Assistant Orb (Left Foreground) */}
      <AICompanionOrb position={[-1.9, 0.7, 0.8]} />

      {/* Soft Contact Shadows on Ground */}
      <ContactShadows
        position={[0, -0.62, 0]}
        opacity={0.45}
        scale={8}
        blur={2}
        far={4}
        resolution={256}
        color="#0B132B"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minPolarAngle={Math.PI / 3}
        maxAzimuthAngle={Math.PI / 4}
        minAzimuthAngle={-Math.PI / 4}
      />
    </>
  );
};

// 2D Accessible Fallback Component
export const HeroWorkforce2DFallback: React.FC = () => {
  return (
    <div className="relative w-full h-[460px] flex items-center justify-center p-8 bg-gradient-to-br from-blue-50/80 via-white to-slate-100 rounded-[32px] border border-blue-100 shadow-tactile overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-shramik-200/40 rounded-full blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md flex flex-col gap-5">
        {/* Recruiter & Job Card Banner */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-shramik-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              HQ
            </div>
            <div>
              <p className="text-xs font-bold text-shramik-700 uppercase tracking-wider">Recruiter Desk</p>
              <h4 className="text-sm font-semibold text-slate-900">Mapusa Municipal Project</h4>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            10 Painters
          </span>
        </div>

        {/* SMS Stream Visual */}
        <div className="flex items-center justify-center gap-2 py-1">
          <div className="h-0.5 flex-1 bg-gradient-to-r from-shramik-500 to-amber-500" />
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Automated SMS Broadcast
          </span>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-500 to-emerald-500" />
        </div>

        {/* Matched Workers Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                RN
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                96% Match
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Ramesh Naik</p>
              <p className="text-xs text-slate-500">Plumber • 8y exp • 2.1km</p>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span className="font-semibold text-emerald-700">★ 4.7 (126 Jobs)</span>
              <span className="font-bold text-slate-800">₹850/day</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                SK
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                93% Match
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Suresh Kumar</p>
              <p className="text-xs text-slate-500">Painter • 6y exp • 3.4km</p>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span className="font-semibold text-emerald-700">★ 4.5 (89 Jobs)</span>
              <span className="font-bold text-slate-800">₹800/day</span>
            </div>
          </div>
        </div>

        {/* Basic Phone SMS Reply Notification */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 font-mono text-sm border border-slate-700">
              [ 1 ]
            </div>
            <div>
              <p className="text-xs text-slate-400">Basic Phone SMS Received</p>
              <p className="text-sm font-semibold text-white">"1 — Interested in Mapusa Job"</p>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

// Main Export Component with 3D and 2D Switcher
export const HeroWorkforce3D: React.FC = () => {
  const { accessibility } = useWorkforce();

  if (!accessibility.threeD) {
    return <HeroWorkforce2DFallback />;
  }

  return (
    <div className="relative w-full h-[480px] lg:h-[540px] rounded-[36px] overflow-hidden bg-gradient-to-b from-blue-50/50 via-slate-50/70 to-slate-100/90 border border-slate-200/80 shadow-tactile">
      {/* Floating 3D Badge */}
      <div className="absolute top-4 left-5 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm text-xs font-semibold text-slate-700">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Live 3D Workforce Network
      </div>

      <Canvas
        camera={{ position: [0, 1.2, 4.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
