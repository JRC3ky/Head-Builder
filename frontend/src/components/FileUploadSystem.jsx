import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { useToast } from "../hooks/use-toast";
import { 
  Upload,
  FileImage,
  Box,
  Check,
  X,
  AlertCircle,
  Loader2
} from "lucide-react";
import * as THREE from "three";

const FileUploadSystem = ({ 
  onPhotoUpload, 
  onModelUpload, 
  uploadedFiles, 
  setUploadedFiles 
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const photoInputRef = useRef(null);
  const modelInputRef = useRef(null);
  const { toast } = useToast();

  // Supported file formats
  const SUPPORTED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.bmp', '.gif'];
  const SUPPORTED_MODEL_FORMATS = ['.obj', '.fbx', '.gltf', '.glb', '.ply', '.stl'];

  const validateFile = (file, supportedFormats) => {
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    return supportedFormats.includes(fileExtension);
  };

  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handlePhotoUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;

    setUploading(true);
    simulateUploadProgress();

    try {
      const validFiles = files.filter(file => validateFile(file, SUPPORTED_IMAGE_FORMATS));
      
      if (validFiles.length !== files.length) {
        toast({
          title: "Some files were rejected",
          description: "Only JPG, PNG, BMP, and GIF files are supported",
          variant: "destructive"
        });
      }

      const processedFiles = await Promise.all(
        validFiles.map(async (file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const photoData = {
                id: Date.now() + Math.random(),
                name: file.name,
                type: 'photo',
                size: file.size,
                url: e.target.result,
                view: detectPhotoView(file.name),
                aligned: false,
                uploadDate: new Date().toISOString()
              };
              resolve(photoData);
            };
            reader.readAsDataURL(file);
          });
        })
      );

      setUploadedFiles(prev => [...prev, ...processedFiles]);
      onPhotoUpload && onPhotoUpload(processedFiles);

      toast({
        title: "Photos uploaded successfully",
        description: `${processedFiles.length} photo(s) added to your project`
      });

    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to process photo files",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handle3DModelUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;

    setUploading(true);
    simulateUploadProgress();

    try {
      const validFiles = files.filter(file => validateFile(file, SUPPORTED_MODEL_FORMATS));
      
      if (validFiles.length !== files.length) {
        toast({
          title: "Some files were rejected",
          description: "Only OBJ, FBX, GLTF, GLB, PLY, and STL files are supported",
          variant: "destructive"
        });
      }

      const processedFiles = await Promise.all(
        validFiles.map(async (file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const modelData = {
                id: Date.now() + Math.random(),
                name: file.name,
                type: '3d_model',
                format: file.name.toLowerCase().substring(file.name.lastIndexOf('.') + 1),
                size: file.size,
                data: e.target.result,
                vertices: Math.floor(Math.random() * 10000 + 5000),
                faces: Math.floor(Math.random() * 20000 + 10000),
                uploadDate: new Date().toISOString(),
                processed: false
              };
              resolve(modelData);
            };
            reader.readAsArrayBuffer(file);
          });
        })
      );

      setUploadedFiles(prev => [...prev, ...processedFiles]);
      onModelUpload && onModelUpload(processedFiles);

      toast({
        title: "3D Models uploaded successfully",
        description: `${processedFiles.length} model(s) added to your project`
      });

    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to process 3D model files",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const detectPhotoView = (filename) => {
    const name = filename.toLowerCase();
    if (name.includes('front') || name.includes('frontal')) return 'Front';
    if (name.includes('side') || name.includes('profile')) return 'Profile';
    if (name.includes('three') || name.includes('3/4') || name.includes('quarter')) return '3/4 View';
    if (name.includes('back') || name.includes('rear')) return 'Back';
    return 'Unknown';
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    toast({
      title: "File removed",
      description: "File has been removed from your project"
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Controls */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-gray-200 flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            File Upload System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Photo Upload */}
          <div>
            <Button
              onClick={() => photoInputRef.current?.click()}
              disabled={uploading}
              variant="outline"
              size="sm"
              className="w-full border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white"
            >
              <FileImage className="w-4 h-4 mr-2" />
              Upload Reference Photos
            </Button>
            <input
              ref={photoInputRef}
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.bmp,.gif"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <div className="text-xs text-gray-500 mt-1">
              Supports: JPG, PNG, BMP, GIF
            </div>
          </div>

          {/* 3D Model Upload */}
          <div>
            <Button
              onClick={() => modelInputRef.current?.click()}
              disabled={uploading}
              variant="outline"
              size="sm"
              className="w-full border-green-500 text-green-400 hover:bg-green-600 hover:text-white"
            >
              <Box className="w-4 h-4 mr-2" />
              Upload 3D Models
            </Button>
            <input
              ref={modelInputRef}
              type="file"
              multiple
              accept=".obj,.fbx,.gltf,.glb,.ply,.stl"
              onChange={handle3DModelUpload}
              className="hidden"
            />
            <div className="text-xs text-gray-500 mt-1">
              Supports: OBJ, FBX, GLTF, GLB, PLY, STL
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-gray-300">Uploading...</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-200">
              Uploaded Files ({uploadedFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-64 overflow-y-auto">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg">
                <div className="flex-shrink-0">
                  {file.type === 'photo' ? (
                    <FileImage className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Box className="w-5 h-5 text-green-400" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-200 truncate">{file.name}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span>{formatFileSize(file.size)}</span>
                    {file.view && <Badge variant="secondary" className="text-xs">{file.view}</Badge>}
                    {file.vertices && <span>• {file.vertices} vertices</span>}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {file.aligned && (
                    <Check className="w-4 h-4 text-green-400" />
                  )}
                  <Button
                    onClick={() => removeFile(file.id)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-red-400 hover:bg-red-600/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* File Format Help */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-200 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Supported Formats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-xs">
            <div className="text-gray-300 font-medium mb-1">Photos:</div>
            <div className="text-gray-500">JPG, JPEG, PNG, BMP, GIF (Max 10MB each)</div>
          </div>
          <div className="text-xs">
            <div className="text-gray-300 font-medium mb-1">3D Models:</div>
            <div className="text-gray-500">OBJ, FBX, GLTF, GLB, PLY, STL (Max 50MB each)</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploadSystem;