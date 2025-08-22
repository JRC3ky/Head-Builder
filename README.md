# Head-Builder
Head builder addon for Blender 3D - Professional face modeling toolkit with parametric controls.

## 🎯 What's New in This Branch

This branch contains a **complete, working Blender addon** for professional 3D face modeling with significant improvements:

### ✅ **Fixed Issues:**
- **Better Head Mesh**: Replaced odd-shaped sphere mesh with anatomically correct head template
- **Removed Dependencies**: Fixed numpy import error (replaced with mathutils)
- **Improved Stability**: Fixed context switching and error handling issues
- **Enhanced Mesh Quality**: Professional topology with proper face proportions

### 🚀 **Key Features:**
- **Parametric Face Controls**: Real-time adjustment of face width, height, eye distance, nose, mouth, chin
- **Reference Photo Integration**: Load and align front/profile/3-quarter view photos
- **Professional Materials**: Realistic skin materials with subsurface scattering
- **Advanced Mesh Tools**: Mirror modifier, subdivision surface, UV unwrapping
- **Export Ready**: OBJ/FBX export for external applications

## 📦 **Installation & Usage**

### **Quick Start:**
1. **Install the Addon:**
   ```
   Blender → Preferences → Add-ons → Install → Select `blender_addon/facebuilder` folder
   ```

2. **Enable the Addon:**
   - Search for "FaceBuilder for Blender"
   - Check the checkbox to enable
   - Save preferences

3. **Start Modeling:**
   - Press `N` in 3D viewport to open sidebar
   - Click "FaceBuilder" tab
   - Click "Create Head" to generate base mesh
   - Use parameter sliders for real-time adjustments

### **Complete Guide:**
- 📖 **[Detailed Installation Guide](blender_addon/INSTALLATION_GUIDE.md)**
- 📋 **[Feature Documentation](blender_addon/README.md)**
- 🧪 **[Test Script](blender_addon/test_addon.py)** - Verify addon functionality

## 🎮 **User Interface**

The addon provides organized panels in the 3D viewport sidebar:

- **🎛️ Main Panel**: Core mesh operations (Create Head, Refine Mesh)
- **📸 Reference Photos**: Photo loading and alignment tools
- **🎨 Face Parameters**: Real-time shape controls (width, height, features)
- **⚙️ Mesh Settings**: Quality settings, subdivision, modifiers
- **🖼️ Materials**: Texture generation and skin materials
- **🔧 Advanced Tools**: Export options and utilities

## 🔧 **Technical Specifications**

- **Blender Version**: 3.0+ required
- **Dependencies**: None (uses built-in Blender modules only)
- **Mesh Quality**: Low (2K), Medium (8K), High (32K) vertex options
- **Export Formats**: OBJ, FBX
- **Material System**: Principled BSDF with subsurface scattering

## 🎯 **Workflow Example**

1. **Create Base**: Click "Create Head" → generates anatomical head mesh
2. **Load Photos**: Add reference photos (front/profile views)
3. **Adjust Shape**: Use sliders to modify face proportions in real-time
4. **Refine**: Apply parameters and generate skin textures
5. **Export**: Save as OBJ/FBX for external use

## 🧪 **Testing**

Run the included test to verify everything works:

1. Open Blender's Scripting workspace
2. Load `blender_addon/test_addon.py`
3. Click "Run Script"
4. Check console for test results

Expected output: ✅ All tests pass, addon working correctly

## 📁 **Repository Structure**

```
Head-Builder/
├── blender_addon/           # Complete Blender addon
│   ├── facebuilder/        # Main addon package
│   │   ├── __init__.py     # Addon registration
│   │   ├── operators.py    # Core functionality
│   │   ├── panels.py       # User interface
│   │   ├── properties.py   # Scene properties
│   │   └── utils.py        # Mesh utilities
│   ├── README.md           # Feature documentation
│   ├── INSTALLATION_GUIDE.md # Installation instructions
│   └── test_addon.py       # Test script
├── backend/                # Backend components
├── frontend/               # Frontend components
└── tests/                  # Test suite
```

## 🎉 **Success Verification**

After installation, you should see:
- ✅ FaceBuilder tab in 3D viewport sidebar
- ✅ "Create Head" generates proper head mesh (not odd sphere)
- ✅ Parameter sliders update mesh in real-time
- ✅ Photo loading works without errors
- ✅ Material generation creates realistic skin
- ✅ Export functions work properly

## 🔍 **Troubleshooting**

**Addon not appearing:**
- Verify Blender 3.0+ is being used
- Check addon is enabled in Preferences
- Restart Blender after installation

**Parameters not working:**
- Ensure FaceBuilder mesh is selected
- Verify mesh was created with "Create Head" button
- Try "Refine Mesh" to apply current parameters

**Import errors:**
- All dependencies removed - should work out of the box
- Check Blender console for specific error messages

## 🎯 **Ready to Use**

This branch contains a **complete, tested, and working** Blender addon. The previous issues with odd-shaped meshes and dependency errors have been resolved. The addon now provides professional-quality face modeling tools ready for production use.

**Start creating professional 3D faces in Blender today!**
