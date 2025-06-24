#!/bin/bash

# SVG to PNG Converter Home Assistant Add-on Installer
# This script helps install the SVG to PNG Converter add-on to your Home Assistant installation

# Default Home Assistant add-ons directory
DEFAULT_ADDONS_DIR="/addons"

# Function to display usage information
usage() {
  echo "Usage: $0 [options]"
  echo "Options:"
  echo "  -d, --dir DIR    Specify the Home Assistant add-ons directory (default: $DEFAULT_ADDONS_DIR)"
  echo "  -h, --help       Display this help message"
  exit 1
}

# Parse command line arguments
ADDONS_DIR="$DEFAULT_ADDONS_DIR"

while [[ $# -gt 0 ]]; do
  case "$1" in
    -d|--dir)
      ADDONS_DIR="$2"
      shift 2
      ;;
    -h|--help)
      usage
      ;;
    *)
      echo "Unknown option: $1"
      usage
      ;;
  esac
done

# Check if the add-ons directory exists
if [ ! -d "$ADDONS_DIR" ]; then
  echo "Error: Add-ons directory '$ADDONS_DIR' does not exist."
  echo "Please specify the correct directory using the -d or --dir option."
  exit 1
fi

# Create the add-on directory
ADDON_DIR="$ADDONS_DIR/svg-to-png"
echo "Creating add-on directory: $ADDON_DIR"
mkdir -p "$ADDON_DIR"

# Copy all files to the add-on directory
echo "Copying files to add-on directory..."
cp -r ./* "$ADDON_DIR/"

# Check if icon.png exists, if not, remind the user
if [ ! -f "icon.png" ]; then
  echo "Warning: icon.png not found. Please create a 128x128 PNG icon file and place it in the add-on directory."
fi

echo "Installation complete!"
echo "Next steps:"
echo "1. Restart Home Assistant or refresh the Add-on Store"
echo "2. Find 'SVG to PNG Converter' in the Local Add-ons section"
echo "3. Click Install and then Start"
echo "4. The service will be available at http://homeassistant.local:3000"
