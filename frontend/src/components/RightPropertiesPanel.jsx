import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { 
  Settings, 
  Palette, 
  Camera, 
  Layers,
  Lightbulb,
  Eye
} from "lucide-react";

const RightPropertiesPanel = ({ activeModel, onParameterChange, viewportMode }) => {
  const handleSliderChange = (param, value) => {
    onParameterChange(param, value[0]);
  };

  return (
    <div className="w-80 bg-gray-850 border-l border-gray-700 overflow-y-auto">
      <Tabs defaultValue="model" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800 m-2">
          <TabsTrigger value="model" className="text-xs">Model</TabsTrigger>
          <TabsTrigger value="material" className="text-xs">Material</TabsTrigger>
          <TabsTrigger value="lighting" className="text-xs">Lighting</TabsTrigger>
          <TabsTrigger value="render" className="text-xs">Render</TabsTrigger>
        </TabsList>

        <TabsContent value="model" className="p-4 space-y-4">
          {/* Face Parameters */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-200 flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Face Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Face Width</Label>
                <Slider
                  value={[activeModel?.parameters?.faceWidth || 50]}
                  onValueChange={(value) => handleSliderChange('faceWidth', value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-gray-500">{activeModel?.parameters?.faceWidth || 50}%</div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Face Height</Label>
                <Slider
                  value={[activeModel?.parameters?.faceHeight || 60]}
                  onValueChange={(value) => handleSliderChange('faceHeight', value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-gray-500">{activeModel?.parameters?.faceHeight || 60}%</div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Eye Distance</Label>
                <Slider
                  value={[activeModel?.parameters?.eyeDistance || 45]}
                  onValueChange={(value) => handleSliderChange('eyeDistance', value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-gray-500">{activeModel?.parameters?.eyeDistance || 45}%</div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Nose Height</Label>
                <Slider
                  value={[activeModel?.parameters?.noseHeight || 55]}
                  onValueChange={(value) => handleSliderChange('noseHeight', value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-gray-500">{activeModel?.parameters?.noseHeight || 55}%</div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Mouth Width</Label>
                <Slider
                  value={[activeModel?.parameters?.mouthWidth || 40]}
                  onValueChange={(value) => handleSliderChange('mouthWidth', value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-gray-500">{activeModel?.parameters?.mouthWidth || 40}%</div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Chin Height</Label>
                <Slider
                  value={[activeModel?.parameters?.chinHeight || 50]}
                  onValueChange={(value) => handleSliderChange('chinHeight', value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-gray-500">{activeModel?.parameters?.chinHeight || 50}%</div>
              </div>
            </CardContent>
          </Card>

          {/* Mesh Settings */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-200">Mesh Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Subdivision Level</Label>
                <Input 
                  type="number" 
                  value="2" 
                  className="w-16 h-8 text-xs bg-gray-700 border-gray-600"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Smoothing</Label>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Mirror Modifier</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="material" className="p-4 space-y-4">
          {/* Material Properties */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-200 flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Material Properties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Base Color</Label>
                <div className="w-full h-8 bg-gradient-to-r from-pink-300 to-orange-200 rounded border border-gray-600"></div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Roughness</Label>
                <Slider
                  defaultValue={[30]}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Metallic</Label>
                <Slider
                  defaultValue={[0]}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Subsurface Scattering</Label>
                <Slider
                  defaultValue={[15]}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Texture Settings */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-200">Texture Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full border-green-500 text-green-400 hover:bg-green-600 hover:text-white">
                Generate Texture
              </Button>
              <Button variant="ghost" size="sm" className="w-full text-gray-300 hover:text-white hover:bg-gray-700">
                Load Texture
              </Button>
              
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Auto UV Unwrap</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lighting" className="p-4 space-y-4">
          {/* Lighting Settings */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-200 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" />
                Scene Lighting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Sun Strength</Label>
                <Slider
                  defaultValue={[75]}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Environment Strength</Label>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Shadow Softness</Label>
                <Slider
                  defaultValue={[25]}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* HDRI Settings */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-200">HDRI Environment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" size="sm" className="w-full text-gray-300 hover:text-white hover:bg-gray-700">
                Load HDRI
              </Button>
              
              <div className="text-xs text-gray-500">
                Current: <span className="text-gray-300">Studio_Lighting.hdr</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="render" className="p-4 space-y-4">
          {/* Render Settings */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-200 flex items-center">
                <Camera className="w-4 h-4 mr-2" />
                Render Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Resolution</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="1920" 
                    className="w-20 h-8 text-xs bg-gray-700 border-gray-600"
                  />
                  <span className="text-gray-500 text-xs flex items-center">×</span>
                  <Input 
                    placeholder="1080" 
                    className="w-20 h-8 text-xs bg-gray-700 border-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-400">Samples</Label>
                <Slider
                  defaultValue={[128]}
                  min={32}
                  max={4096}
                  step={32}
                  className="w-full"
                />
                <div className="text-xs text-gray-500">128 samples</div>
              </div>

              <Button variant="default" size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                Render Image
              </Button>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-200">Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                Export as .OBJ
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Export as .FBX
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Export as .GLTF
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RightPropertiesPanel;