import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const skills = [
  "Python", "React", "AI/ML", "TensorFlow", "Data Science", "JavaScript",
  "TypeScript", "Node.js", "FinTech", "Deep Learning", "NLP", "PyTorch",
  "Bioinformatics", "Trading Bots", "IoT", "MongoDB", "SQL", "Docker",
  "Leadership", "Arduino", "Automation", "Gen AI", "LLMs", "Robotics",
  "Flask", "Django", "C++", "Git", "Linux", "APIs"
];

function SkillText({ text, position, color }: { text: string; position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.lookAt(camera.position);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <Text
        ref={ref}
        position={position}
        fontSize={0.15}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        {text}
      </Text>
    </Float>
  );
}

function GlowingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial
        color="#6366f1"
        emissive="#4f46e5"
        emissiveIntensity={0.3}
        transparent
        opacity={0.8}
        wireframe
      />
    </mesh>
  );
}

function OrbitingSkills() {
  const groupRef = useRef<THREE.Group>(null);
  
  const skillPositions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const radius = 2.2 + Math.random() * 0.5;
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      ] as [number, number, number];
    });
  }, []);

  const colors = ["#f472b6", "#a78bfa", "#60a5fa", "#34d399", "#fbbf24", "#f87171"];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillText
          key={skill}
          text={skill}
          position={skillPositions[i]}
          color={colors[i % colors.length]}
        />
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a78bfa" />
      <GlowingSphere />
      <OrbitingSkills />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

const SkillsSphere = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Scene />
      </Canvas>
      
      {/* Center text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <span className="text-5xl sm:text-6xl font-display font-bold text-gradient">90+</span>
          <p className="text-sm text-muted-foreground mt-1">Skills</p>
        </div>
      </div>
      
      {/* Gradient overlay for blending */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-background/50" />
    </div>
  );
};

export default SkillsSphere;
