import React, { useRef } from "react";
import { Button } from "./ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { 
  FileIcon, 
  Save,
  FolderOpen,
  Download,
  Upload,
  Settings,
  HelpCircle,
  Camera,
  Image
} from "lucide-react";

const TopMenuBar = ({ onPhotoUpload, isPhotoLoaded }) => {
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4 gap-2">
      {/* Logo and Title */}
      <div className="flex items-center gap-3 mr-6">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">FB</span>
        </div>
        <h1 className="text-lg font-semibold text-gray-100">FaceBuilder for Blender</h1>
      </div>

      {/* File Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
            <FileIcon className="w-4 h-4 mr-2" />
            File
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 border-gray-700">
          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
            <FolderOpen className="w-4 h-4 mr-2" />
            New Project
          </DropdownMenuItem>
          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
            <Save className="w-4 h-4 mr-2" />
            Save Project
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export Model
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Photo Upload */}
      <Button 
        variant="ghost" 
        size="sm" 
        className={`text-gray-300 hover:text-white hover:bg-gray-700 ${isPhotoLoaded ? 'bg-blue-600 text-white' : ''}`}
        onClick={handlePhotoClick}
      >
        <Camera className="w-4 h-4 mr-2" />
        Load Photos
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={onPhotoUpload}
        className="hidden"
      />

      {/* Tools Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
            Tools
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 border-gray-700">
          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
            Auto Alignment
          </DropdownMenuItem>
          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
            Manual Alignment
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
            Generate Texture
          </DropdownMenuItem>
          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
            Refine Model
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side buttons */}
      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </Button>

      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
        <HelpCircle className="w-4 h-4 mr-2" />
        Help
      </Button>
    </div>
  );
};

export default TopMenuBar;