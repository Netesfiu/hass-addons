# SVG to PNG Converter for Material Design Icons

A Home Assistant add-on that dynamically converts Material Design Icons (MDI) SVG icons into PNG images for use in Home Assistant notifications.

## Features

- Converts MDI SVG icons to PNG images on-the-fly
- Configurable image size
- In-memory caching for improved performance
- CORS support for cross-origin requests
- Error handling with appropriate HTTP status codes
- Designed specifically for Home Assistant

## API Usage

### Convert MDI Icon to PNG

```
GET /mdi.png?icon=mdi:icon-name&size=96
```

#### Parameters

- `icon` (required): The MDI icon name in the format `mdi:icon-name` (e.g., `mdi:weather-sunny`)
- `size` (optional): The width and height of the output PNG image in pixels (default: 96)

#### Example

```
GET /mdi.png?icon=mdi:home&size=128
```

This will return a 128x128 PNG image of the home icon.

### Cache Management

#### Get Cache Statistics

```
GET /cache/stats
```

Returns information about the cache usage.

#### Clear Cache

```
POST /cache/clear
```

Clears the in-memory cache.

## Installation in Home Assistant

### Installation as a Local Add-on

1. Copy the entire `svg-to-png` folder to your Home Assistant's `addons` directory:
   - Typically located at `/addons` in your Home Assistant installation
   - If using Home Assistant OS, this would be in `/addons/svg-to-png`
   - If using Home Assistant Container, mount a volume to `/addons` and place it there

2. Restart Home Assistant or refresh the Add-on Store

3. Find "SVG to PNG Converter" in the Local Add-ons section of your Add-on Store

4. Click Install

5. Start the add-on

6. The service will be available at `http://homeassistant.local:3000` or `http://[your-ha-ip]:3000`

## Using with Home Assistant Notifications

Once installed, you can use the service in your notification templates:

```yaml
service: notify.mobile_app_your_device
data:
  message: "Check the weather!"
  data:
    image: "http://homeassistant.local:3000/mdi.png?icon=mdi:weather-sunny&size=96"
```

You can also use your Home Assistant's IP address:

```yaml
service: notify.mobile_app_your_device
data:
  message: "Check the weather!"
  data:
    image: "http://192.168.1.123:3000/mdi.png?icon=mdi:weather-sunny&size=96"
```

## License

MIT
