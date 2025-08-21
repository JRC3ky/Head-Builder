import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import TopMenuBar from "./TopMenuBar";
import LeftToolPanel from "./LeftToolPanel";
import RightPropertiesPanel from "./RightPropertiesPanel";
import ViewportArea from "./ViewportArea";
import StatusBar from "./StatusBar";
import { mockFaceBuilderData } from "../data/mockData";

const FaceBuilderApp = () => {
  const [activeModel, setActiveModel] = useState(mockFaceBuilderData.models[0]);
  const [selectedTool, setSelectedTool] = useState('select');
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);
  const [viewportMode, setViewportMode] = useState('solid');
  const [referencePhotos, setReferencePhotos] = useState(mockFaceBuilderData.referencePhotos);

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsPhotoLoaded(true);
      // Mock photo loading
      console.log('Photo uploaded:', files[0].name);
    }
  };

  const handleModelParameter = (param, value) => {
    setActiveModel(prev => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [param]: value
      }
    }));
  };

  return (
    <div className="h-screen w-full bg-gray-900 text-gray-100 flex flex-col overflow-hidden">
      {/* Top Menu Bar */}
      <TopMenuBar 
        onPhotoUpload={handlePhotoUpload}
        isPhotoLoaded={isPhotoLoaded}
      />
      
      <Separator className="bg-gray-700" />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Tool Panel */}
        <LeftToolPanel 
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          activeModel={activeModel}
          referencePhotos={referencePhotos}
        />
        
        <Separator orientation="vertical" className="bg-gray-700" />
        
        {/* Central Viewport */}
        <ViewportArea 
          activeModel={activeModel}
          viewportMode={viewportMode}
          setViewportMode={setViewportMode}
          selectedTool={selectedTool}
          isPhotoLoaded={isPhotoLoaded}
        />
        
        <Separator orientation="vertical" className="bg-gray-700" />
        
        {/* Right Properties Panel */}
        <RightPropertiesPanel 
          activeModel={activeModel}
          onParameterChange={handleModelParameter}
          viewportMode={viewportMode}
        />
      </div>
      
      <Separator className="bg-gray-700" />
      
      {/* Status Bar */}
      <StatusBar 
        activeModel={activeModel}
        selectedTool={selectedTool}
      />
    </div>
  );
};

export default FaceBuilderApp;