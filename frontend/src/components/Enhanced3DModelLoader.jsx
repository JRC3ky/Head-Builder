import React, { useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";

// Enhanced 3D Model Loader Component
const Enhanced3DModelLoader = ({ 
  modelFile, 
  faceParameters, 
  viewportMode,
  onModelLoad,
  onLoadError 
}) => {
  const [modelGeometry, setModelGeometry] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!modelFile || !modelFile.data) return;

    const loadModel = async () => {
      setLoading(true);
      
      try {
        const format = modelFile.format.toLowerCase();
        let loader;
        let result;

        // Create appropriate loader based on file format
        switch (format) {
          case 'gltf':
          case 'glb':
            loader = new GLTFLoader();
            result = await new Promise((resolve, reject) => {
              loader.parse(
                modelFile.data,
                '',
                (gltf) => resolve(gltf.scene),
                (error) => reject(error)
              );
            });
            break;

          case 'obj':
            loader = new OBJLoader();
            result = await new Promise((resolve, reject) => {
              const text = new TextDecoder().decode(modelFile.data);
              try {
                const obj = loader.parse(text);
                resolve(obj);
              } catch (error) {
                reject(error);
              }
            });
            break;

          case 'fbx':
            loader = new FBXLoader();
            result = await new Promise((resolve, reject) => {
              loader.parse(
                modelFile.data,
                '',
                (fbx) => resolve(fbx),
                (error) => reject(error)
              );
            });
            break;

          case 'ply':
            loader = new PLYLoader();
            result = await new Promise((resolve, reject) => {
              try {
                const geometry = loader.parse(modelFile.data);
                const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
                resolve(mesh);
              } catch (error) {
                reject(error);
              }
            });
            break;

          case 'stl':
            loader = new STLLoader();
            result = await new Promise((resolve, reject) => {
              try {
                const geometry = loader.parse(modelFile.data);
                const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
                resolve(mesh);
              } catch (error) {
                reject(error);
              }
            });
            break;

          default:
            throw new Error(`Unsupported format: ${format}`);
        }

        // Process and optimize the loaded model
        if (result) {
          processModel(result);
          setModelGeometry(result);
          onModelLoad && onModelLoad(result, modelFile);
        }

      } catch (error) {
        console.error('Model loading error:', error);
        onLoadError && onLoadError(error, modelFile);
      } finally {
        setLoading(false);
      }
    };

    loadModel();
  }, [modelFile, onModelLoad, onLoadError]);

  const processModel = (model) => {
    // Center the model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.copy(center).multiplyScalar(-1);

    // Scale the model to fit viewport
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    model.scale.setScalar(scale);

    // Apply face parameters if available
    if (faceParameters && model.children) {
      model.children.forEach(child => {
        if (child.isMesh && child.geometry) {
          applyFaceParameters(child, faceParameters);
        }
      });
    }

    // Set materials based on viewport mode
    model.traverse((child) => {
      if (child.isMesh) {
        child.material = getMaterialForMode(viewportMode);
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  };

  const applyFaceParameters = (mesh, parameters) => {
    if (!mesh.geometry.attributes.position) return;

    const positions = mesh.geometry.attributes.position;
    const originalPositions = positions.array.slice();

    for (let i = 0; i < positions.count; i++) {
      const x = originalPositions[i * 3];
      const y = originalPositions[i * 3 + 1];
      const z = originalPositions[i * 3 + 2];

      // Apply face width
      positions.setX(i, x * (parameters.faceWidth / 100));
      
      // Apply face height
      positions.setY(i, y * (parameters.faceHeight / 100));
      
      // Apply other parameters based on vertex position
      if (y > 0.5) { // Upper face area
        positions.setZ(i, z * (parameters.eyeDistance / 100));
      }
    }

    positions.needsUpdate = true;
    mesh.geometry.computeVertexNormals();
  };

  const getMaterialForMode = (mode) => {
    switch (mode) {
      case 'wireframe':
        return new THREE.MeshBasicMaterial({ 
          color: 0x10b981, 
          wireframe: true,
          transparent: true,
          opacity: 0.8
        });
      case 'solid':
        return new THREE.MeshLambertMaterial({ color: 0x8b5cf6 });
      case 'material':
        return new THREE.MeshStandardMaterial({ 
          color: 0xfbbf24,
          roughness: 0.3,
          metalness: 0.1
        });
      case 'rendered':
        return new THREE.MeshStandardMaterial({ 
          color: 0xf3e8ff,
          roughness: 0.2,
          metalness: 0.05,
          transparent: true,
          opacity: 0.95
        });
      default:
        return new THREE.MeshStandardMaterial({ color: 0x8b5cf6 });
    }
  };

  // Re-apply materials when viewport mode changes
  useEffect(() => {
    if (modelGeometry) {
      modelGeometry.traverse((child) => {
        if (child.isMesh) {
          child.material = getMaterialForMode(viewportMode);
        }
      });
    }
  }, [viewportMode, modelGeometry]);

  // Re-apply face parameters when they change
  useEffect(() => {
    if (modelGeometry && faceParameters) {
      modelGeometry.traverse((child) => {
        if (child.isMesh) {
          applyFaceParameters(child, faceParameters);
        }
      });
    }
  }, [faceParameters, modelGeometry]);

  if (loading) {
    return null; // Loading handled by parent
  }

  if (!modelGeometry) {
    return null; // No model loaded
  }

  return <primitive object={modelGeometry} />;
};

// Model Manager Component
export const ModelManager = ({ 
  uploadedModels, 
  activeModelId, 
  faceParameters, 
  viewportMode,
  onModelProcessed 
}) => {
  const [processedModels, setProcessedModels] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  const handleModelLoad = (model, modelFile) => {
    setProcessedModels(prev => ({
      ...prev,
      [modelFile.id]: model
    }));
    setLoadingStates(prev => ({
      ...prev,
      [modelFile.id]: false
    }));
    onModelProcessed && onModelProcessed(model, modelFile);
  };

  const handleLoadError = (error, modelFile) => {
    console.error(`Failed to load model ${modelFile.name}:`, error);
    setLoadingStates(prev => ({
      ...prev,
      [modelFile.id]: false
    }));
  };

  const activeModel = uploadedModels.find(model => model.id === activeModelId);
  const processedModel = activeModel ? processedModels[activeModel.id] : null;

  return (
    <>
      {activeModel && !processedModel && (
        <Enhanced3DModelLoader
          modelFile={activeModel}
          faceParameters={faceParameters}
          viewportMode={viewportMode}
          onModelLoad={handleModelLoad}
          onLoadError={handleLoadError}
        />
      )}
      
      {processedModel && (
        <primitive object={processedModel} />
      )}
    </>
  );
};

export default Enhanced3DModelLoader;