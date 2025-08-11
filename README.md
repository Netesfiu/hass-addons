# Home Assistant Add-on: SVG to PNG Converter
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-F16061?style=plastic&logo=ko-fi&logoColor=white)](https://ko-fi.com/netesfiu)
<br>
<br>
![Project Stage][project-stage-shield]
[![License][license-shield]](LICENSE.md)

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]
![Supports armhf Architecture][armhf-shield]
![Supports armv7 Architecture][armv7-shield]
![Supports i386 Architecture][i386-shield]

Convert Material Design Icons (MDI) SVG icons to PNG images for use in Home Assistant notifications.

## About

This add-on provides a web service that dynamically converts Material Design Icons (MDI) SVG icons into PNG images. It's particularly useful for Home Assistant notifications that require PNG images.

The service accepts HTTP GET requests with icon name and size parameters, fetches the corresponding SVG from the official MDI CDN, converts it to PNG, and serves it with the correct MIME type.

### Key Features

- Converts MDI SVG icons to PNG images on-the-fly
- Configurable image size
- Custom icon colors
- Background shapes (circle, square, rounded-square)
- Customizable background colors
- Adjustable padding between icon and background
- In-memory caching for improved performance
- CORS support for cross-origin requests
- Error handling with appropriate HTTP status codes

## Installation

Follow these steps to add this repository to your Home Assistant instance:

1. Navigate in your Home Assistant frontend to **Settings** -> **Add-ons** -> **Add-on Store**.
2. Click the 3-dots menu at top right -> **Repositories**
3. Add the URL `https://github.com/Netesfiu/hass-addons`
4. Click **Add**
5. Find the "SVG to PNG Converter" add-on and click it.
6. Click on the "INSTALL" button.

## Documentation

For detailed documentation, please see the [SVG to PNG Converter add-on documentation](./svg-to-png/README.md).

## License

MIT License

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
[armhf-shield]: https://img.shields.io/badge/armhf-yes-green.svg
[armv7-shield]: https://img.shields.io/badge/armv7-yes-green.svg
[i386-shield]: https://img.shields.io/badge/i386-yes-green.svg
[license-shield]: https://img.shields.io/github/license/Netesfiu/hass-addons.svg
[project-stage-shield]: https://img.shields.io/badge/project%20stage-production%20ready-brightgreen.svg
[releases-shield]: https://img.shields.io/github/release/Netesfiu/hass-addons.svg
[releases]: https://github.com/Netesfiu/hass-addons/releases
