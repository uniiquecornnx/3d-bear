import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

export function Bear() {
  const bearGroup = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);

  // Animation states using react-spring
  const [springs, api] = useSpring(() => ({
    position: [0, 0, 0] as [number, number, number],
    config: { mass: 1, tension: 180, friction: 12 }
  }));

  // Animation loop for subtle movement
  useFrame((state) => {
    if (bearGroup.current) {
      // Add very subtle floating animation
      bearGroup.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      
      // Blink animation
      if (leftEyeRef.current && rightEyeRef.current) {
        const blinkInterval = 3;
        const time = state.clock.getElapsedTime();
        const blink = (time % blinkInterval) > (blinkInterval - 0.15);
        leftEyeRef.current.scale.y = blink ? 0.1 : 1;
        rightEyeRef.current.scale.y = blink ? 0.1 : 1;
      }
    }
  });

  return (
    <animated.group
      ref={bearGroup}
      position={springs.position as unknown as [number, number, number]}
      scale={[0.4, 0.4, 0.4]} // Made the bear smaller
    >
      {/* Bear Head */}
      <group position={[0, 0.8, 0]}>
        <mesh scale={[1.4, 1.1, 1.2]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial color="#C19A6B" />
        </mesh>
      </group>

      {/* Bear Face */}
      <group position={[0, 0.8, 1.2]}>
        {/* Muzzle/Face background */}
        <mesh position={[0, -0.1, 0.2]}>
          <circleGeometry args={[0.8, 32]} />
          <meshStandardMaterial color="#F5E6D3" />
        </mesh>

        {/* Eyes */}
        <group ref={leftEyeRef} position={[-0.3, 0.1, 0.25]}>
          <mesh rotation={[0, 0, 0]}>
            <planeGeometry args={[0.2, 0.2]} />
            <meshBasicMaterial color="black" side={THREE.DoubleSide} />
          </mesh>
        </group>
        <group ref={rightEyeRef} position={[0.3, 0.1, 0.25]}>
          <mesh rotation={[0, 0, 0]}>
            <planeGeometry args={[0.2, 0.2]} />
            <meshBasicMaterial color="black" side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Nose */}
        <mesh position={[0, -0.15, 0.25]}>
          <planeGeometry args={[0.25, 0.25]} />
          <meshBasicMaterial color="black" side={THREE.DoubleSide} />
        </mesh>

        {/* Smile */}
        <mesh position={[0, -0.5, 0.25]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.5, 0.1]} />
          <meshBasicMaterial color="black" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Ears */}
      <group position={[0, 1.6, -0.2]}>
        <mesh position={[-1.1, 0, 0]} scale={[1, 1.2, 1]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#C19A6B" />
        </mesh>
        <mesh position={[1.1, 0, 0]} scale={[1, 1.2, 1]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#C19A6B" />
        </mesh>
      </group>

      {/* Body - main */}
      <mesh position={[0, -1, 0]} scale={[0.9, 0.9, 0.9]}>
        <capsuleGeometry args={[1.1, 1.5, 32, 32]} />
        <meshStandardMaterial color="#C19A6B" />
      </mesh>

      {/* Belly */}
      <mesh position={[0, -1, 0.6]} scale={[0.9, 0.9, 0.9]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial color="#F5E6D3" />
      </mesh>

      {/* Arms */}
      <group position={[0, -0.7, 0]} scale={[0.9, 0.9, 0.9]}>
        <mesh position={[-1.3, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <capsuleGeometry args={[0.3, 0.8, 32, 32]} />
          <meshStandardMaterial color="#C19A6B" />
        </mesh>
        <mesh position={[1.3, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
          <capsuleGeometry args={[0.3, 0.8, 32, 32]} />
          <meshStandardMaterial color="#C19A6B" />
        </mesh>
      </group>

      {/* Legs */}
      <group position={[0, -2.2, 0]} scale={[0.9, 0.9, 0.9]}>
        <group position={[-0.5, 0, 0]}>
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <capsuleGeometry args={[0.25, 0.4, 32, 32]} />
            <meshStandardMaterial color="#C19A6B" />
          </mesh>
          <mesh position={[0, -0.4, 0.1]} rotation={[0.3, 0, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#C19A6B" />
          </mesh>
        </group>
        <group position={[0.5, 0, 0]}>
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <capsuleGeometry args={[0.25, 0.4, 32, 32]} />
            <meshStandardMaterial color="#C19A6B" />
          </mesh>
          <mesh position={[0, -0.4, 0.1]} rotation={[0.3, 0, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#C19A6B" />
          </mesh>
        </group>
      </group>
    </animated.group>
  );
} 