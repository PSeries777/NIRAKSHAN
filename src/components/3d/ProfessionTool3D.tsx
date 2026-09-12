import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { Wrench, Paintbrush, Hammer, Zap, BrickWall, Cog } from 'lucide-react';
import { WorkerSkill } from '../../types';
import { useWorkforce } from '../../context/WorkforceContext';

interface ProfessionBadgeProps {
  skill: WorkerSkill;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfessionTool3D: React.FC<ProfessionBadgeProps> = ({ skill, size = 'md' }) => {
  const { accessibility } = useWorkforce();

  const getIcon2D = () => {
    switch (skill) {
      case 'Plumber':
        return <Wrench className="w-5 h-5 text-blue-600" />;
      case 'Painter':
        return <Paintbrush className="w-5 h-5 text-emerald-600" />;
      case 'Carpenter':
        return <Hammer className="w-5 h-5 text-amber-600" />;
      case 'Electrician':
        return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'Mason':
        return <BrickWall className="w-5 h-5 text-rose-600" />;
      case 'Mechanic':
        return <Cog className="w-5 h-5 text-slate-700" />;
      default:
        return <Wrench className="w-5 h-5 text-blue-600" />;
    }
  };

  const getColors = () => {
    switch (skill) {
      case 'Plumber':
        return { bg: 'bg-blue-50 border-blue-200', mesh: '#0284C7' };
      case 'Painter':
        return { bg: 'bg-emerald-50 border-emerald-200', mesh: '#10B981' };
      case 'Carpenter':
        return { bg: 'bg-amber-50 border-amber-200', mesh: '#D97706' };
      case 'Electrician':
        return { bg: 'bg-yellow-50 border-yellow-200', mesh: '#EAB308' };
      case 'Mason':
        return { bg: 'bg-rose-50 border-rose-200', mesh: '#E11D48' };
      case 'Mechanic':
        return { bg: 'bg-slate-100 border-slate-300', mesh: '#475569' };
      default:
        return { bg: 'bg-blue-50 border-blue-200', mesh: '#0284C7' };
    }
  };

  const colors = getColors();

  if (!accessibility.threeD) {
    return (
      <div className={`inline-flex items-center justify-center rounded-2xl border ${colors.bg} ${size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10'} shadow-sm`}>
        {getIcon2D()}
      </div>
    );
  }

  // Lightweight 3D Canvas
  const boxDim = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11';

  return (
    <div className={`relative ${boxDim} rounded-2xl border ${colors.bg} shadow-sm overflow-hidden flex items-center justify-center`}>
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[2, 3, 2]} intensity={1.5} />
        <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
          {skill === 'Plumber' && (
            <group rotation={[0.4, 0.5, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 1.3, 16]} />
              <meshStandardMaterial color={colors.mesh} metalness={0.7} roughness={0.3} />
            </group>
          )}
          {skill === 'Painter' && (
            <group rotation={[0.2, 0.4, 0.2]}>
              <RoundedBox args={[0.5, 0.9, 0.4]} radius={0.08} smoothness={4}>
                <meshStandardMaterial color={colors.mesh} roughness={0.4} />
              </RoundedBox>
            </group>
          )}
          {skill === 'Carpenter' && (
            <group rotation={[0.5, 0.3, 0.4]}>
              <RoundedBox args={[1.1, 0.35, 0.35]} radius={0.05} smoothness={3}>
                <meshStandardMaterial color={colors.mesh} roughness={0.8} />
              </RoundedBox>
            </group>
          )}
          {skill === 'Electrician' && (
            <group rotation={[0.2, 0.6, 0.3]}>
              <octahedronGeometry args={[0.6, 0]} />
              <meshStandardMaterial color={colors.mesh} emissive="#CA8A04" emissiveIntensity={0.5} />
            </group>
          )}
          {(skill === 'Mason' || skill === 'Mechanic' || skill === 'Welder' || skill === 'Construction' || skill === 'Cleaner' || skill === 'Agricultural') && (
            <group rotation={[0.3, 0.5, 0.2]}>
              <RoundedBox args={[0.7, 0.5, 0.5]} radius={0.08} smoothness={4}>
                <meshStandardMaterial color={colors.mesh} metalness={0.5} roughness={0.4} />
              </RoundedBox>
            </group>
          )}
        </Float>
      </Canvas>
    </div>
  );
};
