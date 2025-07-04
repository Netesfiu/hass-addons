# SVG to PNG Converter for Material Design Icons

A Home Assistant add-on that dynamically converts Material Design Icons (MDI) SVG icons into PNG images for use in Home Assistant notifications.

## Features

- Converts MDI SVG icons to PNG images on-the-fly
- Configurable image size
- Custom icon colors
- Background shapes (circle, square, rounded-square)
- Customizable background colors
- Adjustable padding between icon and background
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
- `iconColor` (optional): Color for the icon (e.g., `#FF0000`, `red`, `rgb(255,0,0)`)
- `bgColor` (optional): Background color (e.g., `#00FF00`, `green`, `rgba(0,255,0,0.5)`)
- `bgShape` (optional): Background shape, one of: `none`, `circle`, `square`, `rounded-square` (default: `none`)
- `padding` (optional): Padding around icon as percentage of size (0-50, default: 10)

#### Examples

```
GET /mdi.png?icon=mdi:home&size=128
```

This will return a 128x128 PNG image of the home icon.

```
GET /mdi.png?icon=mdi:alert&size=96&iconColor=red
```

This will return a red alert icon.

```
GET /mdi.png?icon=mdi:weather-sunny&size=96&bgColor=%23FF9800&bgShape=circle
```

This will return a weather-sunny icon with an orange circular background.

```
GET /mdi.png?icon=mdi:home&size=96&iconColor=white&bgColor=%234CAF50&bgShape=rounded-square&padding=15
```

This will return a white home icon on a green rounded square background with 15% padding.

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

### Installation from Repository

1. In Home Assistant, go to **Settings** → **Add-ons** → **Add-on Store**
2. Click the menu (⋮) in the top-right corner
3. Select **Repositories**
4. Add the URL: `https://github.com/Netesfiu/hass-addons`
5. Click **Add**
6. Find the "SVG to PNG Converter" add-on in the add-on store
7. Click **Install**
8. Start the add-on
9. The service will be available at `http://homeassistant.local:3000` or `http://[your-ha-ip]:3000`

### Manual Installation

If you prefer to install manually:

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

### Basic Usage

```yaml
service: notify.mobile_app_your_device
data:
  message: "Check the weather!"
  data:
    image: "http://homeassistant.local:3000/mdi.png?icon=mdi:weather-sunny&size=96"
```

### With Styling

```yaml
service: notify.mobile_app_your_device
data:
  message: "Weather Alert!"
  data:
    image: "http://homeassistant.local:3000/mdi.png?icon=mdi:weather-lightning&size=96&iconColor=yellow&bgColor=%23333333&bgShape=circle"
```

### Dynamic Styling Based on State

```yaml
service: notify.mobile_app_your_device
data:
  message: "Temperature: {{ states('sensor.temperature') }}°C"
  data:
    image: >-
      {% set temp = states('sensor.temperature') | float %}
      {% set color = '#FF0000' if temp > 30 else '#0000FF' if temp < 10 else '#00FF00' %}
      http://homeassistant.local:3000/mdi.png?icon=mdi:thermometer&size=96&iconColor=white&bgColor={{ color | urlencode }}&bgShape=circle
```

You can also use your Home Assistant's IP address instead of homeassistant.local:

```yaml
service: notify.mobile_app_your_device
data:
  message: "Check the weather!"
  data:
    image: "http://192.168.1.123:3000/mdi.png?icon=mdi:weather-sunny&size=96"
```

## License

MIT
