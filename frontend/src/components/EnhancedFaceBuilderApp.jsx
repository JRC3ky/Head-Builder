import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useToast } from "../hooks/use-toast";
import { Toaster } from "./ui/toaster";
import TopMenuBar from "./TopMenuBar";
import LeftToolPanel from "./LeftToolPanel";
import RightPropertiesPanel from "./RightPropertiesPanel";
import Enhanced3DViewport from "./Enhanced3DViewport";
import StatusBar from "./StatusBar";
import FileUploadSystem from "./FileUploadSystem";
import { ModelManager } from "./Enhanced3DModelLoader";
import { mockFaceBuilderData } from "../data/mockData";

const EnhancedFaceBuilderApp = () => {
  const [activeModel, setActiveModel] = useState(mockFaceBuilderData.models[0]);
  const [selectedTool, setSelectedTool] = useState('select');
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);
  const [viewportMode, setViewportMode] = useState('solid');
  const [referencePhotos, setReferencePhotos] = useState(mockFaceBuilderData.referencePhotos);
  
  // Enhanced state for file uploads and 3D models
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loaded3DModels, setLoaded3DModels] = useState([]);
  const [activeModelId, setActiveModelId] = useState(null);
  const [faceParameters, setFaceParameters] = useState({
    faceWidth: 50,
    faceHeight: 60,
    eyeDistance: 45,
    noseHeight: 55,
    mouthWidth: 40,
    chinHeight: 50
  });

  const { toast } = useToast();

  const handlePhotoUpload = (newPhotos) => {
    setReferencePhotos(prev => [...prev, ...newPhotos.map(photo => ({
      id: photo.id,
      name: photo.name,
      view: photo.view,
      aligned: photo.aligned,
      url: photo.url
    }))]);
    setIsPhotoLoaded(true);
    
    toast({
      title: "Photos uploaded successfully",
      description: `${newPhotos.length} reference photo(s) added to your project`
    });
  };

  const handleModelUpload = (newModels) => {
    setLoaded3DModels(prev => [...prev, ...newModels]);
    
    // Auto-select the first uploaded model
    if (newModels.length > 0 && !activeModelId) {
      setActiveModelId(newModels[0].id);
      setActiveModel({
        ...activeModel,
        vertices: newModels[0].vertices,
        faces: newModels[0].faces,
        name: newModels[0].name
      });
    }
    
    toast({
      title: "3D Models uploaded successfully",
      description: `${newModels.length} 3D model(s) ready for processing`
    });
  };

  const handleModelParameter = (param, value) => {
    setFaceParameters(prev => ({
      ...prev,
      [param]: value
    }));
    
    setActiveModel(prev => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [param]: value
      }
    }));
  };

  const handleModelProcessed = (processedModel, modelFile) => {
    toast({
      title: "Model processed",
      description: `${modelFile.name} is now ready for editing`
    });
  };

  const handleFileUpload = (event) => {
    // Legacy photo upload handler for compatibility
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsPhotoLoaded(true);
      toast({
        title: "Photos loaded",
        description: `${files.length} file(s) selected for processing`
      });
    }
  };

  return (
    <div className="h-screen w-full bg-gray-900 text-gray-100 flex flex-col overflow-hidden">
      {/* Top Menu Bar */}
      <TopMenuBar 
        onPhotoUpload={handleFileUpload}
        isPhotoLoaded={isPhotoLoaded}
      />
      
      <Separator className="bg-gray-700" />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Tool Panel with Enhanced Upload System */}
        <div className="w-80 bg-gray-850 border-r border-gray-700 overflow-y-auto">
          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800 m-2">
              <TabsTrigger value="tools" className="text-xs">Tools</TabsTrigger>
              <TabsTrigger value="photos" className="text-xs">Photos</TabsTrigger>
              <TabsTrigger value="models" className="text-xs">Models</TabsTrigger>
              <TabsTrigger value="upload" className="text-xs">Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="tools" className="p-4 space-y-4">
              <LeftToolPanel 
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
                activeModel={activeModel}
                referencePhotos={referencePhotos}
              />
            </TabsContent>

            <TabsContent value="photos" className="p-4 space-y-4">
              <div className="space-y-3">
                {referencePhotos.map((photo) => (
                  <div key={photo.id} className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg">
                    <div className="w-12 h-12 bg-gray-600 rounded-md flex items-center justify-center overflow-hidden">
                      {photo.url && photo.url.startsWith('data:') ? (
                        <img 
                          src={photo.url} 
                          alt={photo.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-blue-500 rounded"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-200">{photo.name}</div>
                      <div className="text-xs text-gray-400">{photo.view}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="models" className="p-4 space-y-4">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200">3D Models ({loaded3DModels.length})</h3>
                {loaded3DModels.map((model) => (
                  <div 
                    key={model.id} 
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      activeModelId === model.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    onClick={() => setActiveModelId(model.id)}
                  >
                    <div className="text-sm text-gray-200 font-medium">{model.name}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Format: {model.format.toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {model.vertices} vertices • {model.faces} faces
                    </div>
                  </div>
                ))}
                
                {loaded3DModels.length === 0 && (
                  <div className="text-sm text-gray-500 text-center py-4">
                    No 3D models uploaded yet
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="upload" className="p-4">
              <FileUploadSystem 
                onPhotoUpload={handlePhotoUpload}
                onModelUpload={handleModelUpload}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <Separator orientation="vertical" className="bg-gray-700" />
        
        {/* Enhanced Central Viewport with Three.js */}
        <Enhanced3DViewport 
          activeModel={activeModel}
          viewportMode={viewportMode}
          setViewportMode={setViewportMode}
          selectedTool={selectedTool}
          isPhotoLoaded={isPhotoLoaded}
          loaded3DModel={activeModelId ? loaded3DModels.find(m => m.id === activeModelId) : null}
          faceParameters={faceParameters}
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
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default EnhancedFaceBuilderApp;