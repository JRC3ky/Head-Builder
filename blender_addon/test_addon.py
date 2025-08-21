"""
FaceBuilder Addon Test Script
Run this in Blender's scripting workspace to test the addon functionality
"""

import bpy

def test_facebuilder_addon():
    """Test FaceBuilder addon functionality"""
    print("=" * 50)
    print("Testing FaceBuilder Addon")
    print("=" * 50)
    
    # Test 1: Check if addon is registered
    try:
        facebuilder_props = bpy.context.scene.facebuilder
        print("✅ FaceBuilder properties found")
    except AttributeError:
        print("❌ FaceBuilder addon not properly registered")
        return False
    
    # Test 2: Test head creation
    try:
        bpy.ops.facebuilder.create_head()
        print("✅ Head creation successful")
        
        # Check if object was created
        active_obj = bpy.context.active_object
        if active_obj and active_obj.get("facebuilder_mesh"):
            print(f"✅ FaceBuilder mesh created: {active_obj.name}")
        else:
            print("❌ FaceBuilder mesh marker not found")
            
    except Exception as e:
        print(f"❌ Head creation failed: {e}")
        return False
    
    # Test 3: Test parameter changes
    try:
        facebuilder_props.face_width = 1.5
        facebuilder_props.face_height = 0.8
        print("✅ Parameter adjustment successful")
    except Exception as e:
        print(f"❌ Parameter adjustment failed: {e}")
        return False
    
    # Test 4: Test mesh refinement
    try:
        bpy.ops.facebuilder.refine_mesh()
        print("✅ Mesh refinement successful")
    except Exception as e:
        print(f"❌ Mesh refinement failed: {e}")
        return False
    
    # Test 5: Test material creation
    try:
        bpy.ops.facebuilder.generate_texture()
        print("✅ Texture generation successful")
    except Exception as e:
        print(f"❌ Texture generation failed: {e}")
        return False
    
    print("\n" + "=" * 50)
    print("🎉 All FaceBuilder tests passed!")
    print("The addon is working correctly.")
    print("=" * 50)
    
    return True

def show_addon_info():
    """Display addon information"""
    print("\n📋 FaceBuilder Addon Information:")
    print("- Location: 3D Viewport > Sidebar > FaceBuilder")
    print("- Features: Parametric face modeling, photo alignment, texture generation")
    print("- Compatible: Blender 3.0+")
    print("\n🎯 Quick Start:")
    print("1. Press 'N' in 3D viewport to open sidebar")
    print("2. Click 'FaceBuilder' tab")
    print("3. Click 'Create Head' to start")
    print("4. Adjust parameters with sliders")
    print("5. Load reference photos for alignment")

if __name__ == "__main__":
    # Clear console
    bpy.ops.console.clear_line()
    
    # Run tests
    success = test_facebuilder_addon()
    
    if success:
        show_addon_info()
    else:
        print("\n🔧 Troubleshooting:")
        print("1. Check if addon is enabled in Preferences")
        print("2. Restart Blender and try again")
        print("3. Verify addon files are in correct directory")