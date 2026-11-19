# Changelog

## 1.1.0

- Playground UI on `/` (also the ingress panel): icon picker with the full MDI list, size and padding
  sliders, background shape, icon and background colours with an alpha slider
- Live preview, the resulting image URL and a ready-to-paste notification snippet, each copyable
- New `/icons` endpoint serving the MDI name list, cached for a day


## 1.0.0

- Renders Material Design Icons as PNG images for notification `image` fields
- Size, icon color, background color, background shape and padding per request
- In-memory cache for repeated requests
- Serves `/mdi.png`, `/health`, `/cache/stats` and `/cache/clear`
- Ingress panel and a `watchdog` on `/health`
- AppArmor stays at the Supervisor default, so updates always apply

