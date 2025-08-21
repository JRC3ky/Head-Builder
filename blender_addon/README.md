# 🎨 FaceBuilder for Blender - Complete Addon Package

A professional Blender addon for creating photorealistic 3D faces from reference photos with advanced parametric controls.

## 🚀 **What's Included**

### **📁 Complete Package Structure:**
```
facebuilder/
├── __init__.py          # Main addon registration
├── properties.py        # Scene properties and settings
├── operators.py         # Core functionality operators
├── panels.py           # UI panels and interface
├── utils.py            # Mesh manipulation utilities
└── README.md           # This file
```

### **📋 Additional Files:**
- `INSTALLATION_GUIDE.md` - Complete installation instructions
- `test_addon.py` - Test script to verify addon functionality
- `facebuilder_addon.tar.gz` - Packaged addon ready for installation

## 🎯 **Key Features**

### **✨ Professional Face Modeling:**
- **Parametric Controls:** Real-time face shape adjustment
- **Reference Photo Integration:** Load and align front, profile, 3/4 views
- **Advanced Mesh Generation:** Professional topology with proper edge flow
- **Material System:** Realistic skin materials with subsurface scattering

### **🔧 Technical Excellence:**
- **Blender 3.0+ Compatible:** Uses latest Blender Python API
- **BMesh Integration:** Real-time mesh manipulation
- **Modifier Stack:** Automatic mirror, subdivision, smoothing
- **UV Mapping:** Automatic unwrapping for texture application

### **🎮 User Interface:**
- **Professional Panels:** Organized in 3D viewport sidebar
- **Real-time Updates:** Live parameter adjustment
- **Photo Management:** Reference photo loading and alignment
- **Export Tools:** OBJ, FBX format support

## 🛠️ **Installation**

### **Quick Install:**
1. **Download:** Extract the addon files
2. **Install:** Blender → Preferences → Add-ons → Install → Select `facebuilder` folder
3. **Enable:** Check the "FaceBuilder for Blender" checkbox
4. **Verify:** Look for "FaceBuilder" tab in 3D viewport sidebar

**📖 [Detailed Installation Guide](INSTALLATION_GUIDE.md)**

## 🎯 **Quick Start**

### **Basic Workflow:**
1. **Create Base Mesh:** Click "Create Head" in FaceBuilder panel
2. **Load Photos:** Add reference photos (front, profile views)
3. **Adjust Parameters:** Use sliders for face width, height, features
4. **Refine Mesh:** Apply parameters and generate textures
5. **Export:** Save as OBJ/FBX for use in other applications

### **UI Panels Overview:**
- **🎛️ Main Panel:** Core mesh operations and creation
- **📸 Reference Photos:** Photo loading and alignment tools  
- **🎨 Face Parameters:** Real-time shape control sliders
- **⚙️ Mesh Settings:** Quality, subdivision, modifiers
- **🖼️ Materials:** Texture generation and skin materials
- **🔧 Advanced Tools:** Export options and utilities

## 🧪 **Testing the Addon**

Run the included test script to verify installation:

1. **Open Blender's Scripting workspace**
2. **Load `test_addon.py`**
3. **Click "Run Script"**
4. **Check console for test results**

The test will verify all major functionality and report any issues.

## 🎨 **Technical Specifications**

### **Requirements:**
- **Blender:** Version 3.0 or higher
- **Python:** Blender's built-in Python (no additional setup needed)
- **Memory:** 4GB RAM recommended for high-resolution meshes
- **Storage:** ~50MB for addon and generated data

### **Supported Formats:**
- **Import:** JPG, PNG, BMP reference photos
- **Export:** OBJ, FBX mesh formats
- **Internal:** Blender .blend native format

### **Performance:**
- **Low Resolution:** ~2K vertices, real-time updates
- **Medium Resolution:** ~8K vertices, smooth performance
- **High Resolution:** ~32K vertices, detailed modeling

## 🎯 **Advanced Features**

### **🔬 Mesh Manipulation:**
- **Landmark-based deformation** for accurate face shaping
- **Regional parameter control** (eyes, nose, mouth, chin)
- **Symmetrical editing** with automatic mirror modifier
- **Quality control** with multiple subdivision levels

### **🎨 Material System:**
- **Principled BSDF** with realistic skin properties
- **Subsurface scattering** for organic skin appearance
- **Procedural textures** generated from reference photos
- **Node-based workflow** for advanced customization

### **📐 Professional Tools:**
- **UV unwrapping** for texture application
- **Export pipeline** for external software
- **Batch processing** for multiple face variations
- **Parameter presets** for common face types

## 🔍 **Development & Customization**

### **Code Structure:**
- **Modular Design:** Separate files for different functionality
- **Clean API:** Well-documented functions and classes
- **Extensible:** Easy to add new parameters and features
- **Blender Integration:** Uses official Blender Python API standards

### **Customization Options:**
- **Add new parameters** in `properties.py`
- **Create custom operators** in `operators.py`
- **Design UI panels** in `panels.py`
- **Implement algorithms** in `utils.py`

## 📚 **Documentation**

### **File Documentation:**
- **`__init__.py`:** Addon registration and metadata
- **`properties.py`:** Scene properties and parameter definitions
- **`operators.py`:** Core functionality and user actions
- **`panels.py`:** User interface layout and controls
- **`utils.py`:** Mesh manipulation and math utilities

### **API Reference:**
- All functions include docstrings
- Type hints for parameter clarity
- Error handling with user feedback
- Blender conventions followed throughout

## 🎉 **Success Verification**

After installation, you should see:

✅ **FaceBuilder tab** in 3D viewport sidebar  
✅ **"Create Head" button** creates base mesh  
✅ **Parameter sliders** update mesh in real-time  
✅ **"Add Reference Photo"** loads image files  
✅ **Material generation** creates realistic skin  
✅ **Export options** save OBJ/FBX files  

## 🚀 **Next Steps**

1. **Install the addon** following the guide
2. **Run the test script** to verify functionality  
3. **Try the basic workflow** with sample photos
4. **Explore advanced features** and customization options
5. **Create professional face models** for your projects

---

## 📄 **License & Credits**

**FaceBuilder for Blender**  
Created by: Emergent AI  
Version: 1.0.0  
Compatible: Blender 3.0+  

**🎯 Ready to transform your 3D face modeling workflow with professional tools!**