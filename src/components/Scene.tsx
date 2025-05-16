import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Bear } from './Bear';

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 25 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <Bear />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={false}
      />
    </Canvas>
  );
} 