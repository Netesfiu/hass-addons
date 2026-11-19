# Changelog

## 1.0.0

- Renders Material Design Icons as PNG images for notification `image` fields
- Size, icon color, background color, background shape and padding per request
- In-memory cache for repeated requests
- Serves `/mdi.png`, `/health`, `/cache/stats` and `/cache/clear`
- Ingress panel and a `watchdog` on `/health`
- AppArmor stays at the Supervisor default, so updates always apply

