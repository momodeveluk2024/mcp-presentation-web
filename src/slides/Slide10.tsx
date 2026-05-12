import { Canvas } from '@react-three/fiber'
import { Float, Sparkles, OrbitControls } from '@react-three/drei'
import { SlideWrapper } from '../components/SlideWrapper'
import { motion } from 'framer-motion'

interface SlideProps {
  direction: number
}

// --- 3D Background - Moving Robots/Agents ---

function RobotSwarm() {
    return (
        <group>
            {Array.from({ length: 15 }).map((_, i) => (
                <Robot 
                    key={i} 
                    position={[
                        (Math.random() - 0.5) * 20, 
                        (Math.random() - 0.5) * 10, 
                        (Math.random() - 0.5) * 10 - 5
                    ]} 
                />
            ))}
        </group>
    )
}

function Robot({ position }: { position: [number, number, number] }) {
    return (
        <Float 
            speed={2} 
            rotationIntensity={2} 
            floatIntensity={2} 
            position={position}
        >
            <group scale={0.4}>
                {/* Head - Shiny Silver */}
                <mesh position={[0, 0.5, 0]}>
                    <boxGeometry args={[1, 0.8, 1]} />
                    <meshStandardMaterial color="#F3F4F6" roughness={0.1} metalness={1} />
                </mesh>
                {/* Eyes */}
                <mesh position={[0.2, 0.6, 0.51]}>
                    <sphereGeometry args={[0.1]} />
                    <meshBasicMaterial color="#22d3ee" />
                </mesh>
                 <mesh position={[-0.2, 0.6, 0.51]}>
                    <sphereGeometry args={[0.1]} />
                    <meshBasicMaterial color="#22d3ee" />
                </mesh>
                {/* Body - Shiny Silver */}
                <mesh position={[0, -0.5, 0]}>
                    <cylinderGeometry args={[0.3, 0.6, 1.2]} />
                    <meshStandardMaterial 
                        color="#E5E7EB"
                        metalness={1}
                        roughness={0.05}
                    />
                </mesh>
                {/* Arms - Shiny Silver */}
                <mesh position={[0.7, -0.2, 0]} rotation={[0, 0, -0.5]}>
                    <capsuleGeometry args={[0.1, 0.8]} />
                     <meshStandardMaterial color="#F3F4F6" metalness={1} roughness={0.1} />
                </mesh>
                 <mesh position={[-0.7, -0.2, 0]} rotation={[0, 0, 0.5]}>
                    <capsuleGeometry args={[0.1, 0.8]} />
                    <meshStandardMaterial color="#F3F4F6" metalness={1} roughness={0.1} />
                </mesh>
            </group>
        </Float>
    )
}

// --- Main Component ---

export function Slide10CTA({ direction }: SlideProps) {
  return (
    <SlideWrapper direction={direction}>
      {/* 3D Value Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -5, 5]} intensity={1} color="#8b5cf6" />
            
            <RobotSwarm />
            
            <Sparkles count={100} scale={20} size={2} color="#c4b5fd" opacity={0.5} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
      }}>
         <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
                fontSize: 'clamp(40px, 6vw, 80px)', // Responsive large text
                fontWeight: 900,
                textAlign: 'center',
                background: 'linear-gradient(to bottom, #4c1d95, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 10px 30px rgba(124, 58, 237, 0.2)',
                lineHeight: 1.1,
                margin: 0
            }}
         >
            THANK YOU FOR<br />LISTENING
         </motion.h1>

         <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
                fontSize: 'clamp(20px, 3vw, 32px)',
                fontWeight: 600,
                color: '#4c1d95',
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                padding: '12px 32px',
                borderRadius: 50,
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                marginTop: 20
            }}
         >
            ANY QUESTIONS?
         </motion.p>
      </div>
    </SlideWrapper>
  )
}
