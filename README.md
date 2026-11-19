# Home Assistant apps

[![Open your Home Assistant instance and show the add app repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FNetesfiu%2Fhass-addons)

A collection of Home Assistant apps. Each folder in this repository is one app, and they are installed
together by adding this repository once.

## Apps

| App | What it does |
| --- | --- |
| [Notify Icons](notify-icons/) | Renders any Material Design Icon as a PNG image, with the size, colors and background shape you ask for — for the `image` field of notifications. |

More apps are added here as they are written; the folder name of an app is its `slug`, and they live side by
side without affecting each other.

## Installation

1. In Home Assistant, go to **Settings** > **Apps** and select **Install app**.
2. Open the menu in the top right and select **Repositories**.
3. Add `https://github.com/Netesfiu/hass-addons`.
4. Every app in this repository appears in the store; install the one you need.

## Repository layout

```text
hass-addons/
  repository.yaml        names this repository in the app store
  README.md
  <app>/
    config.yaml          the app definition: name, version, slug, ports, ingress
    Dockerfile           built on the device, no registry needed
    DOCS.md              shown on the Documentation tab
    README.md            shown on the app page before installing
    CHANGELOG.md
    icon.png, logo.png
    translations/
```

## Support

Bugs and feature requests: <https://github.com/Netesfiu/hass-addons/issues>

## License

MIT
