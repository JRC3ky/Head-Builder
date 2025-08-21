# FaceBuilder for Blender - Installation Guide

## 🎯 **Complete Blender Addon Installation**

### **Step 1: Download the Addon**
The addon is packaged in `/app/blender_addon/facebuilder/` directory.

### **Step 2: Install in Blender**

#### **Method 1: Install from Zip (Recommended)**
1. **Package the addon:**
   - Navigate to `/app/blender_addon/`
   - Compress the `facebuilder` folder into a zip file
   - Or use the provided `facebuilder_addon.tar.gz`

2. **Install in Blender:**
   - Open Blender (version 3.0+)
   - Go to `Edit` → `Preferences` → `Add-ons`
   - Click `Install...` button
   - Navigate to your addon zip file
   - Select and install

3. **Enable the addon:**
   - Search for "FaceBuilder" in the addon list
   - Check the checkbox to enable
   - Click `Save Preferences`

#### **Method 2: Manual Installation**
1. **Find Blender addon directory:**
   - **Windows:** `%APPDATA%\Blender Foundation\Blender\3.x\scripts\addons\`
   - **macOS:** `~/Library/Application Support/Blender/3.x/scripts/addons/`
   - **Linux:** `~/.config/blender/3.x/scripts/addons/`

2. **Copy addon files:**
   - Copy the entire `facebuilder` folder to the addons directory
   - Restart Blender
   - Enable addon in Preferences

### **Step 3: Verify Installation**

1. **Check the interface:**
   - Open Blender's 3D Viewport
   - Press `N` to open the sidebar
   - Look for "FaceBuilder" tab on the right

2. **Test functionality:**
   - Click "Create Head" to generate a base mesh
   - Try adjusting face parameters with sliders
   - Load reference photos using "Add Reference Photo"

## 🎮 **How to Use FaceBuilder**

### **Basic Workflow:**

1. **Create Base Mesh:**
   - Click `Create Head` in the FaceBuilder panel
   - This generates a base head mesh to work with

2. **Load Reference Photos:**
   - Click `Add Reference Photo`
   - Select front, profile, or 3/4 view photos
   - Photos appear as reference planes around your mesh

3. **Adjust Face Parameters:**
   - Use sliders to modify:
     - Face Width & Height
     - Eye Distance
     - Nose Height
     - Mouth Width
     - Chin Height
   - Changes apply in real-time

4. **Refine and Texture:**
   - Click `Auto Align` to align reference photos
   - Use `Generate Texture` to create skin materials
   - Click `Refine Mesh` to apply current parameters

### **Panel Organization:**

- **FaceBuilder Main:** Core mesh operations
- **Reference Photos:** Photo management and alignment
- **Face Parameters:** Real-time face shape controls
- **Mesh Settings:** Quality and modifier settings
- **Materials & Textures:** Skin material generation
- **Advanced Tools:** Export and additional utilities

## 🔧 **Features Overview**

### **✅ Core Features:**
- **Parametric face modeling** with real-time updates
- **Reference photo integration** with alignment tools
- **Professional mesh generation** with proper topology
- **Automatic skin material creation** with subsurface scattering
- **Mirror modifier** for symmetrical editing
- **Subdivision surface** for smooth results
- **UV unwrapping** for texture application

### **✅ Advanced Features:**
- **Multiple viewport support** for reference photos
- **Real-time parameter adjustment** affecting actual mesh geometry
- **Professional material nodes** with realistic skin properties
- **Export compatibility** with OBJ, FBX formats
- **Blender integration** with native tools and workflows

### **✅ Professional Tools:**
- **Landmark-based alignment** system
- **Procedural texture generation** from reference photos
- **Mesh refinement** algorithms
- **Quality control** with multiple resolution options
- **Modifier stack** integration

## 🎨 **Technical Specifications**

- **Blender Version:** 3.0+ required
- **Python API:** Full bpy integration
- **Mesh System:** BMesh for real-time editing
- **Materials:** Principled BSDF with subsurface scattering
- **File Support:** JPG, PNG, BMP image formats
- **Export Formats:** OBJ, FBX mesh export

## 🚀 **Getting Started Tips**

1. **Start Simple:** Begin with the "Create Head" button
2. **Use Good Photos:** Front and profile views work best
3. **Adjust Gradually:** Small parameter changes often work better
4. **Save Frequently:** Save your .blend file regularly
5. **Experiment:** Try different photo combinations and parameters

## 🔍 **Troubleshooting**

**Addon not appearing:**
- Check Blender version (3.0+ required)
- Verify addon is enabled in Preferences
- Restart Blender after installation

**Parameters not working:**
- Ensure you have a FaceBuilder mesh selected
- Check that mesh was created with "Create Head" button
- Try "Refine Mesh" to apply current parameters

**Photos not loading:**
- Check image file formats (JPG, PNG supported)
- Verify file paths are accessible
- Try smaller image files if memory issues occur

## 📝 **Support**

For issues, suggestions, or contributions:
- Check Blender console for error messages
- Verify all files are properly installed
- Ensure Blender version compatibility

---

**🎯 Your FaceBuilder for Blender addon is now ready for professional 3D face modeling!**