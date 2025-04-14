import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function FloatingSphere() {
  const { position } = useSpring({
    from: { position: [0, 0, 0] },
    to: async (next) => {
      while (true) {
        await next({ position: [0, 0.5, 0] });
        await next({ position: [0, -0.5, 0] });
      }
    },
    config: { mass: 1, tension: 120, friction: 14 },
  });

  return (
    <animated.mesh position={position}>
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial
          color="#4F46E5"
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </animated.mesh>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <FloatingSphere />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="backdrop-blur-xl bg-white/10 p-12 rounded-3xl shadow-2xl max-w-3xl w-full border border-white/20">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-8 h-8 text-indigo-400" />
            <h2 className="text-xl font-medium text-white/80">Bolt Chat</h2>
          </div>
          
          <h1 className="text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Experience the Future of Communication
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Step into a new era of conversation with our AI-powered chat platform. 
            Seamless, intelligent, and designed for the modern web.
          </p>
          
          <Link
            to="/chat"
            className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            Start Chatting Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;