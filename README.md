# Auto PiP Manager

**GNOME Shell extension** — automatically manages Picture-in-Picture windows and add MacOS like behaviour.

[Gnome Extenstions](https://extensions.gnome.org/extension/9827/auto-pip-manager/)

[Русская версия](README.ru.md)

## Features

- Automatically pins PiP windows **above all other windows**
- Automatically makes PiP windows visible **on every workspace**
- Moves PiP windows to a **chosen corner** of the screen on appearance
- Snaps PiP windows to a nearest screen corner after a moving.
- Optionally returns keyboard focus to another window after PiP takes it
- Optionally keeps PiP out of Overview workspace previews and thumbnails
- No Top Bar icon or separate background process

## Requirements

- GNOME Shell 45 or later

## Installation

```bash
git clone <repo-url>
cd NextPinP
./install.sh
gnome-extensions enable nextpinp@leonid.nasedkin
```

On **Wayland** a session restart (log out / log in) is required after the first install.  
On **X11** you can reload GNOME Shell in place: press `Alt+F2`, type `r`, press `Enter`.

## Settings

Open the preferences window via the **Extensions** app or:

```bash
gnome-extensions prefs nextpinp@leonid.nasedkin
```

| Setting | Description | Default |
|---------|-------------|---------|
| Corner | Screen corner where PiP windows are placed | Bottom Right |
| Offset | Distance from the corner edge in pixels (0–50) | 20 |
| Never in Focus | Return focus to another window after PiP takes it; allow focus while moving PiP | Off |
| Do Not Show on Overview | Hide PiP from workspace previews and thumbnails | Off |

Available corners: Top Left, Top Right, Bottom Right, Bottom Left.

## Adding a new translation

1. Copy `po/ru.po` to `po/<lang>.po` (e.g. `po/de.po`)
2. Translate the `msgstr` values
3. Run `./install.sh` — the new `.mo` file is compiled automatically

## Project structure

```
├── extension.js       Main extension logic
├── prefs.js           Preferences UI (libadwaita)
├── metadata.json      Extension metadata
├── schemas/           GSettings schema
├── po/                Translation sources (.po)
└── install.sh         Build & install script
```

## License

GPL-2.0-or-later
