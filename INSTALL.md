# Installation Guide for SVG to PNG Converter Add-on

This guide will help you install the SVG to PNG Converter as a local add-on in Home Assistant.

## Prerequisites

- Home Assistant installation (Core, OS, Container, or Supervised)
- Access to the Home Assistant file system

## Installation Steps

1. **Locate your Home Assistant add-ons directory**:
   - For Home Assistant OS: `/addons`
   - For Home Assistant Container: This is the directory you've mounted to `/addons`
   - For Home Assistant Core/Supervised: Check your configuration

2. **Create a directory for the add-on**:
   Create a directory named `svg-to-png` in your add-ons directory.

3. **Copy all files to the add-on directory**:
   Copy all the files from this project into the `svg-to-png` directory you created.

4. **Create an icon file**:
   Replace the `icon.txt` file with a 128x128 PNG image named `icon.png`.

5. **Restart Home Assistant or refresh the Add-on Store**:
   - In Home Assistant, go to Configuration → Add-ons
   - Click the refresh button in the top right corner

6. **Install the add-on**:
   - Find "SVG to PNG Converter" in the Local Add-ons section
   - Click Install

7. **Start the add-on**:
   - After installation completes, click Start

8. **Verify the installation**:
   - Check that the add-on is running
   - Try accessing `http://homeassistant.local:3000/mdi.png?icon=mdi:home&size=96` in your browser
   - You should see a PNG image of the home icon

## Troubleshooting

- If the add-on fails to start, check the add-on logs for errors
- Make sure all required files are in the correct location
- Verify that port 3000 is not being used by another service

## Usage in Home Assistant

Once installed, you can use the service in your notification templates:

```yaml
service: notify.mobile_app_your_device
data:
  message: "Check the weather!"
  data:
    image: "http://homeassistant.local:3000/mdi.png?icon=mdi:weather-sunny&size=96"
```
