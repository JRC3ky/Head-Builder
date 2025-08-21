import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { 
  MousePointer, 
  Move, 
  RotateCcw, 
  ZoomIn,
  Camera,
  Box,
  Image,
  Settings2,
  Target,
  Grid3X3
} from "lucide-react";

const LeftToolPanel = ({ selectedTool, setSelectedTool, activeModel, referencePhotos }) => {
  const tools = [
    { id: 'select', name: 'Select', icon: MousePointer },
    { id: 'move', name: 'Move', icon: Move },
    { id: 'rotate', name: 'Rotate', icon: RotateCcw },
    { id: 'zoom', name: 'Zoom', icon: ZoomIn },
    { id: 'pin', name: 'Pin Tool', icon: Target },
  ];

  return (
    <div className="w-80 bg-gray-850 border-r border-gray-700 overflow-y-auto">
      <Tabs defaultValue="tools" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 m-2">
          <TabsTrigger value="tools" className="text-xs">Tools</TabsTrigger>
          <TabsTrigger value="photos" className="text-xs">Photos</TabsTrigger>
          <TabsTrigger value="model" className="text-xs">Model</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="p-4 space-y-4">
          {/* Main Tools */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-200">FaceBuilder Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "default" : "ghost"}
                  size="sm"
                  className={`w-full justify-start ${
                    selectedTool === tool.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <tool.icon className="w-4 h-4 mr-2" />
                  {tool.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Mesh Operations */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-200">Mesh Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700">
                <Grid3X3 className="w-4 h-4 mr-2" />
                Create Head
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700">
                <Box className="w-4 h-4 mr-2" />
                Refine Mesh
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700">
                <Settings2 className="w-4 h-4 mr-2" />
                Mesh Settings
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-200">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white">
                Auto Alignment
              </Button>
              <Button variant="outline" size="sm" className="w-full border-green-500 text-green-400 hover:bg-green-600 hover:text-white">
                Generate Texture
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="p-4 space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-200">Reference Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {referencePhotos.map((photo) => (
                <div key={photo.id} className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg">
                  <div className="w-12 h-12 bg-gray-600 rounded-md flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-200">{photo.name}</div>
                    <div className="text-xs text-gray-400">{photo.view}</div>
                  </div>
                  <Badge variant={photo.aligned ? "default" : "secondary"} className="text-xs">
                    {photo.aligned ? "Aligned" : "Not Aligned"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="model" className="p-4 space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-200">Model Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <span className="text-gray-400">Vertices:</span>
                <span className="text-gray-200 ml-2">{activeModel?.vertices || 0}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Faces:</span>
                <span className="text-gray-200 ml-2">{activeModel?.faces || 0}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Status:</span>
                <Badge className="ml-2 text-xs">{activeModel?.status || 'Ready'}</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeftToolPanel;