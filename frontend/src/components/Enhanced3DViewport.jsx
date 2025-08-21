import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, Box, Sphere, Text, Environment } from "@react-three/drei";
import { Button } from "./ui/button";
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Home,
  Eye,
  Grid3X3,
  Sun,
  Monitor
} from "lucide-react";
import * as THREE from "three";

// 3D Head Model Component
const FaceModel = ({ modelData, viewportMode, faceParameters }) => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  const getMaterial = () => {
    switch (viewportMode) {
      case 'wireframe':
        return (
          <meshBasicMaterial 
            color="#10b981" 
            wireframe={true}
            transparent={true}
            opacity={0.8}
          />
        );
      case 'solid':
        return <meshLambertMaterial color="#8b5cf6" />;
      case 'material':
        return (
          <meshStandardMaterial 
            color="#fbbf24"
            roughness={0.3}
            metalness={0.1}
          />
        );
      case 'rendered':
        return (
          <meshStandardMaterial 
            color="#f3e8ff"
            roughness={0.2}
            metalness={0.05}
            transparent={true}
            opacity={0.95}
          />
        );
      default:
        return <meshStandardMaterial color="#8b5cf6" />;
    }
  };

  // Create dynamic head geometry based on parameters
  const createHeadGeometry = () => {
    const geometry = new THREE.SphereGeometry(
      1 * (faceParameters?.faceWidth / 100 || 0.5),
      32,
      32
    );
    
    // Modify geometry based on face parameters
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      // Apply face height parameter
      positions.setY(i, y * (faceParameters?.faceHeight / 100 || 0.6));
      
      // Apply face width parameter
      positions.setX(i, x * (faceParameters?.faceWidth / 100 || 0.5));
    }
    
    positions.needsUpdate = true;
    return geometry;
  };

  return (
    <group ref={meshRef}>
      <mesh geometry={createHeadGeometry()}>
        {getMaterial()}
      </mesh>
      
      {/* Eyes */}
      <Sphere position={[-0.3, 0.2, 0.4]} scale={0.1}>
        <meshStandardMaterial color="#000" />
      </Sphere>
      <Sphere position={[0.3, 0.2, 0.4]} scale={0.1}>
        <meshStandardMaterial color="#000" />
      </Sphere>
      
      {/* Nose */}
      <Box position={[0, 0, 0.5]} scale={[0.1, 0.2, 0.1]}>
        <meshStandardMaterial color="#d97706" />
      </Box>
    </group>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
  </div>
);

const Enhanced3DViewport = ({ 
  activeModel, 
  viewportMode, 
  setViewportMode, 
  selectedTool, 
  isPhotoLoaded,
  loaded3DModel,
  faceParameters 
}) => {
  const [zoom, setZoom] = useState(1);
  
  const viewportModes = [
    { id: 'wireframe', name: 'Wireframe', icon: Grid3X3 },
    { id: 'solid', name: 'Solid', icon: Eye },
    { id: 'material', name: 'Material', icon: Sun },
    { id: 'rendered', name: 'Rendered', icon: Monitor }
  ];

  const handleZoom = (direction) => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev * 1.1 : prev * 0.9;
      return Math.max(0.1, Math.min(5, newZoom));
    });
  };

  const resetView = () => {
    setZoom(1);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      {/* Viewport Controls */}
      <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {viewportModes.map((mode) => (
            <Button
              key={mode.id}
              variant={viewportMode === mode.id ? "default" : "ghost"}
              size="sm"
              className={`${
                viewportMode === mode.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              onClick={() => setViewportMode(mode.id)}
            >
              <mode.icon className="w-4 h-4 mr-2" />
              {mode.name}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={() => handleZoom('in')}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={() => handleZoom('out')}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={resetView}
          >
            <Home className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: '#1f2937' }}
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />
            
            {/* Environment */}
            {viewportMode === 'rendered' && (
              <Environment preset="studio" />
            )}
            
            {/* Grid */}
            <Grid 
              args={[20, 20]} 
              position={[0, -2, 0]} 
              cellSize={0.5}
              cellThickness={0.5}
              cellColor="#374151"
              sectionSize={2}
              sectionThickness={1}
              sectionColor="#4b5563"
            />
            
            {/* 3D Face Model */}
            <FaceModel 
              modelData={loaded3DModel}
              viewportMode={viewportMode}
              faceParameters={faceParameters}
            />
            
            {/* Reference Photo Overlay */}
            {isPhotoLoaded && (
              <mesh position={[-3, 0, 0]}>
                <planeGeometry args={[2, 3]} />
                <meshBasicMaterial 
                  color="#3b82f6" 
                  transparent={true} 
                  opacity={0.3}
                />
              </mesh>
            )}
            
            {/* 3D Text Labels */}
            <Text
              position={[0, 3, 0]}
              fontSize={0.3}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              FaceBuilder 3D Model
            </Text>
            
            {/* Controls */}
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI}
              minDistance={2}
              maxDistance={20}
            />
          </Suspense>
        </Canvas>
        
        {/* Tool Indicator Overlay */}
        <div className="absolute top-4 left-4 bg-gray-800/90 border border-gray-700 rounded-lg px-3 py-2">
          <div className="text-sm text-gray-300">
            Active Tool: <span className="text-blue-400 capitalize">{selectedTool}</span>
          </div>
          <div className="text-xs text-gray-500">
            Zoom: {(zoom * 100).toFixed(0)}% | Mode: {viewportMode}
          </div>
        </div>

        {/* Viewport Info */}
        <div className="absolute bottom-4 right-4 bg-gray-800/90 border border-gray-700 rounded-lg px-3 py-2">
          <div className="text-sm text-gray-300">
            Vertices: <span className="text-green-400">{activeModel?.vertices || 8942}</span>
          </div>
          <div className="text-xs text-gray-500">
            Faces: {activeModel?.faces || 17884}
          </div>
        </div>

        {/* Instructions Overlay */}
        {!isPhotoLoaded && !loaded3DModel && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-gray-800/90 border border-gray-700 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                Enhanced FaceBuilder 3D
              </h3>
              <p className="text-gray-400 mb-4">
                Load reference photos or 3D models to start creating
              </p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>• Drag to rotate view</p>
                <p>• Scroll to zoom</p>
                <p>• Right-click drag to pan</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enhanced3DViewport;