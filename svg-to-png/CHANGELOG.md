# Changelog

## 1.1.5

- AppArmor profile: `/init` needs read+execute (`rix`), not just `ix`

## 1.1.4

- AppArmor profile: allow s6-overlay/bashio boot (`/init`, `/etc/s6-overlay`,
  `/usr`, `/bin`, `/sbin`, `/run`) which 1.1.2 blocked, keeping the deny rules
  on `/config`, `/data`, `/media`, `/share`, `/ssl`, `/backup` and `/proc/sys`

## 1.1.3

- `apparmor` is a boolean in the app schema; the profile itself comes from
  `apparmor.txt`

## 1.1.2

- Added an AppArmor profile (`apparmor: profile`): the app may read its own code,
  resolve DNS and open TCP connections, and cannot touch the Home Assistant
  data directories

## 1.1.1

- Added Home Assistant ingress support (ingress panel, no longer requires a
  directly exposed port for the UI)
- Routes now also work behind the `/api/hassio_ingress/<token>` prefix
- Added a small landing page listing the endpoint and a sample icon
- Fixed the `url` field pointing at the upstream example repository

## 1.1.0

- Added support for custom icon colors
- Added support for background shapes (circle, square, rounded-square)
- Added support for customizable background colors
- Added support for adjustable padding between icon and background
- Updated documentation with styling examples
- Added example configurations for styled notifications

## 1.0.0

- Initial release
- Support for converting MDI SVG icons to PNG
- Configurable image size
- In-memory caching
- CORS support
- Error handling
