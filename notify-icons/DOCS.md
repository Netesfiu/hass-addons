# Notify Icons

Renders [Material Design Icons](https://pictogrammers.com/library/mdi/) as PNG images for the `image` field of
Home Assistant notifications.

## How it works

1. You request `/mdi.png` with an icon name and optional styling.
2. The app downloads the matching SVG from the MDI CDN (`cdn.jsdelivr.net`).
3. It rasterizes the SVG onto a transparent or shaped background and returns `image/png`.
4. The result is cached in memory, keyed by icon, size and styling.

## Installation

**From the app store**

1. **Settings** > **Apps** > **Install app**.
2. Menu in the top right > **Repositories** > add `https://github.com/Netesfiu/hass-addons`.
3. Install **Notify Icons** and start it.

**Manually, as a local app**

Copy this folder to the local apps folder (`/addons` on Home Assistant OS, or the folder your installation
mounts there), reload the store, and install it from the local apps section.

## Playground

The app ships a small UI, reachable from the sidebar panel (ingress) or the port directly. Pick an icon from
the list or type any MDI name, drag the size and padding sliders, choose a background shape and colours, and
the preview updates as you go. It shows the resulting URL and a ready-to-paste notification snippet, both with
copy buttons.

Because a phone downloads the image without a Home Assistant session, notifications must point at the app's
own port (`http://home-assistant.local:3000` by default), **not** at the ingress URL. The *Public base URL*
field sets which address ends up in the copied URL, and it is remembered in the browser.

The interface is available in **English** and **Hungarian**. It follows the browser language by default; the
picker in the top right overrides it and the choice is remembered.

## Endpoints

### `GET /mdi.png`

| Parameter | Required | Description |
| --- | --- | --- |
| `icon` | yes | Icon name in MDI format, like `mdi:weather-pouring` |
| `size` | no | Width and height in pixels, 1-1024, default `96` |
| `iconColor` | no | Icon color: `#FF0000`, `red`, `rgb(255,0,0)` |
| `bgColor` | no | Background color, including alpha: `rgba(255,191,0,1)` |
| `bgShape` | no | `none` (default), `circle`, `square`, `rounded-square` |
| `padding` | no | Space around the icon as a percentage, 0-50, default `10` |

```
GET /mdi.png?icon=mdi:home&size=128
GET /mdi.png?icon=mdi:alert&size=96&iconColor=red
GET /mdi.png?icon=mdi:weather-sunny&size=96&bgColor=%23FF9800&bgShape=circle
GET /mdi.png?icon=mdi:home&size=128&iconColor=white&bgColor=%234CAF50&bgShape=rounded-square&padding=15
```

### `GET /health`

Returns `{"status":"ok"}`. Used by the watchdog.

### `GET /cache/stats`

Number of cached variants and their size.

### `POST /cache/clear`

Drops the in-memory cache, for example after changing a color scheme you reuse.

## Styling

Colours and shapes are per request, not global settings.

![Severity colours](https://raw.githubusercontent.com/Netesfiu/hass-addons/master/notify-icons/docs/severity-palette.png)

![Background shapes](https://raw.githubusercontent.com/Netesfiu/hass-addons/master/notify-icons/docs/shapes.png)

Background shapes, left to right: `none`, `circle`, `square`, `rounded-square`.

## Using it in notifications

```yaml
action: notify.mobile_app_my_phone
data:
  title: "Sárga eső figyelmeztetés"
  message: "24 óra alatt 20 mm feletti csapadék várható."
  data:
    image: >-
      http://homeassistant.local:3000/mdi.png?icon=mdi:weather-pouring&size=128&
      iconColor=black&bgColor=rgba(255,191,0,1)&bgShape=circle&padding=15
```

Styling from a template, so the color follows the severity:

```yaml
data:
  image: >-
    {% set level = states('sensor.meteoalarm_level') %}
    {% set color = {'Zöld': '141,182,0', 'Sárga': '255,191,0',
                    'Narancssárga': '255,140,0', 'Piros': '255,8,0'} %}
    http://homeassistant.local:3000/mdi.png?icon={{ icon }}&size=128&iconColor=black
    &bgColor=rgba({{ color.get(level, '141,182,0') }},1)&bgShape=circle&padding=15
```

Replace `homeassistant.local` with the address your phone uses. The phone downloads the image itself, so the
URL must be reachable **from the phone**, not just from Home Assistant.

Ready-to-paste automations: [`examples/`](examples/).

### Where the icon and the image appear

iOS and Android read different keys, and only some of them accept an image URL:

| Key | iOS | Android |
| --- | --- | --- |
| `icon_url` | **sender avatar on the left** of the notification (communication style, needs a `title`). Takes precedence over `notification_icon`. | large icon |
| `image` | attachment: full width when the notification is expanded | big picture |
| `notification_icon` | an MDI glyph drawn over the app icon, white by default | status-bar icon |

To get the rendered icon on the left of an iOS notification, send the same URL as `icon_url` **and** `image`:

```yaml
action: notify.mobile_app_my_phone
data:
  title: "Yellow rain warning"
  message: "More than 20 mm of rain expected."
  data:
    icon_url: "https://mdi.example.com/mdi.png?icon=mdi:weather-pouring&size=192&bgColor=rgba(255,191,0,1)&bgShape=circle"
    image: "https://mdi.example.com/mdi.png?icon=mdi:weather-pouring&size=192&bgColor=rgba(255,191,0,1)&bgShape=circle"
```

## Ingress panel

The app also registers an authenticated panel, so `/mdi.png` and the small landing page are reachable through
Home Assistant without exposing the port to the network. The panel is not a control surface; it lists the
endpoint and shows a sample icon.

## Security notes

- Port 3000 has **no authentication** by design: a phone rendering a notification has no Home Assistant
  session. Keep it on your local network, or put it behind a proxy that suits you.
- The app ships an AppArmor profile (`apparmor.txt`). It may read its own code and the runtime, resolve DNS and
  open TCP connections; `/config`, `/data`, `/media`, `/share`, `/ssl` and `/backup` are denied.
- The app needs no Home Assistant API access beyond the Supervisor API it uses for logging.

## Troubleshooting

**The notification arrives without a picture**

1. Open the URL on the phone's browser. If it does not load there, the phone cannot reach the URL — check the
   host name and that port 3000 is forwarded.
2. The app's log shows one line per request. A missing line usually means a cache in front of the app answered,
   not that the request failed.
3. On iOS 27 the companion app sometimes drops the small thumbnail in the collapsed banner while the image is
   there when you long-press the notification. That is an app issue, not this app — see
   [home-assistant/iOS#5838](https://github.com/home-assistant/iOS/issues/5838).

**The colors of an old notification do not change**

Requests are cached by URL, and a proxy in front of the app may cache them too. Add a changing parameter such
as `&v={{ now().timestamp() | int }}` to bust it.

## License

MIT. Issues and feature requests: <https://github.com/Netesfiu/hass-addons/issues>.
