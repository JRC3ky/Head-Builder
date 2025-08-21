import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
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

const ViewportArea = ({ activeModel, viewportMode, setViewportMode, selectedTool, isPhotoLoaded }) => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const viewportModes = [
    { id: 'wireframe', name: 'Wireframe', icon: Grid3X3 },
    { id: 'solid', name: 'Solid', icon: Eye },
    { id: 'material', name: 'Material', icon: Sun },
    { id: 'rendered', name: 'Rendered', icon: Monitor }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x <= width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw center axes
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    
    // Center vertical line
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    
    // Center horizontal line
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Draw mock 3D head wireframe
    const centerX = width / 2;
    const centerY = height / 2;
    const size = 120 * zoom;

    ctx.strokeStyle = viewportMode === 'wireframe' ? '#10b981' : '#8b5cf6';
    ctx.lineWidth = 2;

    // Head outline (ellipse)
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - 20, size * 0.8, size * 1.2, 0, 0, 2 * Math.PI);
    ctx.stroke();

    // Face features
    if (viewportMode !== 'wireframe') {
      ctx.fillStyle = '#8b5cf6';
      
      // Eyes
      ctx.beginPath();
      ctx.arc(centerX - size * 0.3, centerY - size * 0.3, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(centerX + size * 0.3, centerY - size * 0.3, 8, 0, 2 * Math.PI);
      ctx.fill();

      // Nose
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - size * 0.1);
      ctx.lineTo(centerX - size * 0.1, centerY + size * 0.1);
      ctx.lineTo(centerX + size * 0.1, centerY + size * 0.1);
      ctx.closePath();
      ctx.stroke();

      // Mouth
      ctx.beginPath();
      ctx.arc(centerX, centerY + size * 0.4, size * 0.2, 0, Math.PI);
      ctx.stroke();
    }

    // Reference photo overlay (if loaded)
    if (isPhotoLoaded) {
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.fillRect(centerX - size, centerY - size * 1.2, size * 0.8, size * 1.6);
      
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - size, centerY - size * 1.2, size * 0.8, size * 1.6);
      
      ctx.fillStyle = '#3b82f6';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Reference Photo', centerX - size * 0.6, centerY - size * 1.3);
    }

  }, [viewportMode, zoom, isPhotoLoaded]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - mousePos.x;
      const deltaY = e.clientY - mousePos.y;
      
      setRotation(prev => ({
        x: prev.x + deltaY * 0.5,
        y: prev.y + deltaX * 0.5
      }));
      
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (direction) => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev * 1.1 : prev * 0.9;
      return Math.max(0.1, Math.min(5, newZoom));
    });
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
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

      {/* 3D Viewport */}
      <div className="flex-1 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformOrigin: 'center center'
          }}
        />
        
        {/* Tool Indicator */}
        <div className="absolute top-4 left-4 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          <div className="text-sm text-gray-300">
            Active Tool: <span className="text-blue-400 capitalize">{selectedTool}</span>
          </div>
          <div className="text-xs text-gray-500">
            Zoom: {(zoom * 100).toFixed(0)}%
          </div>
        </div>

        {/* Viewport Info */}
        <div className="absolute bottom-4 right-4 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          <div className="text-sm text-gray-300">
            Mode: <span className="text-green-400">{viewportMode}</span>
          </div>
          <div className="text-xs text-gray-500">
            Vertices: {activeModel?.vertices || 0}
          </div>
        </div>

        {/* Instructions Overlay */}
        {!isPhotoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Card className="bg-gray-800/90 border-gray-700 p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                Welcome to FaceBuilder
              </h3>
              <p className="text-gray-400 mb-4">
                Load reference photos to start creating your 3D face model
              </p>
              <p className="text-sm text-gray-500">
                Click "Load Photos" in the top menu to begin
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewportArea;