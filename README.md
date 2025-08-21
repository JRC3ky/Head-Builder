# Head-Builder

A Blender 3D addon for building and customizing character heads.

## Overview

This addon is designed to help users create and customize character heads in Blender 3D. The addon provides tools and workflows to streamline the head creation process.

## Requirements

- Blender 3.0 or later
- Python 3.10+ (included with Blender)

## Addon Structure

A typical Blender addon consists of:

### Required Files
- `__init__.py` - Main addon entry point with bl_info dictionary
- Python modules (`.py` files) containing the addon functionality
- Optional: `__pycache__/` folder (auto-generated, should be in .gitignore)

### Optional Assets
Depending on the addon's functionality, you may need:
- **Mesh files** (`.blend`, `.obj`, `.fbx`) - Pre-made head base meshes
- **Texture files** (`.png`, `.jpg`, `.exr`) - Skin textures, normal maps, etc.
- **Material files** (`.blend`) - Pre-configured materials
- **Node group files** (`.blend`) - Custom shader node setups
- **Preset files** (`.py`, `.json`) - Configuration presets
- **Documentation** (`README.md`, user guides)

## Installation

### Method 1: Install from ZIP
1. Download the addon as a ZIP file
2. Open Blender
3. Go to `Edit > Preferences > Add-ons`
4. Click `Install...` button
5. Navigate to and select the ZIP file
6. Click `Install Add-on`
7. Enable the addon by checking the checkbox next to its name

### Method 2: Manual Installation
1. Download or clone the addon files
2. Copy the addon folder to your Blender addons directory:
   - **Windows**: `%APPDATA%\Blender Foundation\Blender\[version]\scripts\addons\`
   - **macOS**: `~/Library/Application Support/Blender/[version]/scripts/addons/`
   - **Linux**: `~/.config/blender/[version]/scripts/addons/`
3. Restart Blender
4. Go to `Edit > Preferences > Add-ons`
5. Search for "Head-Builder"
6. Enable the addon by checking the checkbox

## Usage

*Note: Usage instructions will be added once the addon code is implemented.*

### Basic Workflow
1. Enable the addon in Blender preferences
2. Access the addon through the 3D Viewport panel or Tools menu
3. Follow the addon's interface to create and customize heads

### Features (Planned)
- Base head mesh generation
- Facial feature customization
- Texture and material application
- Export options for game engines and other applications

## Development

### Setting Up Development Environment
1. Clone this repository to your Blender addons directory
2. Enable developer mode in Blender (`Edit > Preferences > Interface > Display > Developer Extras`)
3. Use Blender's Text Editor or external IDE for development
4. Reload addon during development: `F3 > "Reload Scripts"`

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly in Blender
5. Submit a pull request

### Addon Structure Template
For developers, a basic Blender addon should have this structure:
```
head_builder/
├── __init__.py          # Main addon file with bl_info
├── operators.py         # Blender operators (actions)
├── panels.py           # UI panels
├── properties.py       # Custom properties
├── utils.py            # Utility functions
└── assets/             # Optional assets folder
    ├── meshes/         # Base head meshes
    ├── textures/       # Texture files
    └── materials/      # Material presets
```

## Assets Guidelines

### Do You Need to Upload Assets?
Yes, if your addon uses any of the following:
- **Base meshes**: Head templates or starting geometry
- **Textures**: Skin textures, eye textures, hair textures
- **Materials**: Pre-configured Blender materials
- **Node groups**: Custom shader setups
- **Presets**: Default configurations or style presets

### Asset Organization
- Keep assets in a dedicated `assets/` folder
- Use relative paths in your Python code
- Compress large textures appropriately
- Consider file size for distribution

### Asset Licensing
- Ensure you have rights to distribute any assets
- Include proper attribution for external assets
- Consider using CC0 or compatible licenses for maximum usability

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

- Report bugs and request features through GitHub Issues
- Check existing issues before creating new ones
- Provide clear steps to reproduce any problems

## Version History

*Version history will be maintained as the addon develops.*

---

**Note**: This addon is currently in development. The actual Python code and assets need to be added to make it functional.