# Installation Guide

## Quick Installation

### Option 1: Download as ZIP (Recommended for Users)
1. Click the green "Code" button on the GitHub repository page
2. Select "Download ZIP"
3. In Blender, go to `Edit > Preferences > Add-ons`
4. Click "Install..." and select the downloaded ZIP file
5. Enable the "Head Builder" addon by checking the box

### Option 2: Git Clone (Recommended for Developers)
1. Navigate to your Blender addons directory:
   - **Windows**: `%APPDATA%\Blender Foundation\Blender\[version]\scripts\addons\`
   - **macOS**: `~/Library/Application Support/Blender/[version]/scripts/addons/`
   - **Linux**: `~/.config/blender/[version]/scripts/addons/`

2. Clone the repository:
   ```bash
   git clone https://github.com/JRC3ky/Head-Builder.git
   ```

3. Restart Blender
4. Go to `Edit > Preferences > Add-ons`
5. Search for "Head Builder" and enable it

## Finding Your Blender Addons Directory

If you can't find your addons directory, you can locate it through Blender:

1. Open Blender
2. Go to `Edit > Preferences > File Paths`
3. Look for "Scripts" path - your addons will be in `[scripts_path]/addons/`

Alternatively, run this in Blender's Python console:
```python
import bpy
print(bpy.utils.user_resource('SCRIPTS', "addons"))
```

## Troubleshooting

### Addon Doesn't Appear
- Make sure you're looking in the correct category ("Mesh")
- Try refreshing the addons list (click the refresh button)
- Check the Blender console for error messages

### Import Errors
- Ensure all addon files are in the same directory
- Check that you have the minimum required Blender version (3.0+)
- Verify Python syntax if you've modified any files

### Developer Mode
For development, enable "Developer Extras" in `Edit > Preferences > Interface > Display`
This gives you access to useful development tools and better error reporting.

## Updating the Addon

### ZIP Installation
1. Disable the old version in Preferences > Add-ons
2. Download the new ZIP file
3. Install the new version
4. Enable the updated addon

### Git Installation
1. Navigate to the addon directory
2. Run `git pull` to update
3. Restart Blender or use "Reload Scripts" (F3 > "Reload Scripts")