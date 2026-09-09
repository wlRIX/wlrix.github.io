---
layout: page
title: Components
permalink: /components/
---

# Components

wlRIX is not one program. Each part of the desktop is an independent git repository, and
[`wlrix-epoch`](https://github.com/wlrix/wlrix-epoch) is the meta-repository that pins a known-good set
of them and builds the whole thing — the same arrangement Pop!\_OS uses for COSMIC.

During day-to-day development you work in sibling clones under a workspace root. At release time,
`wlrix-epoch` bumps its submodule pointers to the tested commit set and tags `epoch-X.Y.Z`. That tag is
the reproducible-build source of truth.

## The desktop

| Component | Language | Role |
|---|---|---|
| [Compositor]({{ '/components/wlrix-compositor/' | relative_url }}) | Rust | Wayland compositor (4Dwm-style window management) |
| [Greeter]({{ '/components/wlrix-greeter/' | relative_url }}) | Rust | greetd greeter (login screen) |
| [Session Manager]({{ '/components/wlrix-session/' | relative_url }}) | Rust | session manager (launches compositor and apps) |
| [Desktop Icons]({{ '/components/wlrix-desktop/' | relative_url }}) | Rust | desktop icons (layer-shell background surface) |
| [Background]({{ '/components/wlrix-bg/' | relative_url }}) | Rust | desktop background, including the SGI and XPM formats IRIX shipped |
| [Idle Manager]({{ '/components/wlrix-idle/' | relative_url }}) | Rust | blank, lock and before-sleep, controller-aware |
| [Settings Daemon]({{ '/components/wlrix-settings-daemon/' | relative_url }}) | Rust | the only writer of the wlRIX config files, over D-Bus |
| [Portal Backend]({{ '/components/xdg-desktop-portal-wlrix/' | relative_url }}) | Rust | screen sharing and screenshots for other applications |
| [Screenshot]({{ '/components/wlrix-screenshot/' | relative_url }}) | Rust | region overlay, save and clipboard |
| [Tray]({{ '/components/wlrix-tray/' | relative_url }}) | Rust | application indicator tray (StatusNotifierItem host) |
| [Avalonia Theme]({{ '/components/wlrix-avalonia/' | relative_url }}) | C# | the Indigo Magic look, as an Avalonia theme |
| [Applications]({{ '/components/wlrix-apps/' | relative_url }}) | C# | toolchest, desks, settings panels and the rest |
| [Assets]({{ '/components/wlrix-assets/' | relative_url }}) | data | shared icons, cursors, wallpapers and the palette |

## Build dependencies

Two forks sit beside the components because `wlrix-apps` reaches them by relative path. They are build
dependencies, not parts of the desktop: nothing from them is installed except by way of `wlrix-apps`.

| Fork | Why |
|---|---|
| `NWayland` | protocol codegen fixes, plus the `wlrix-desks` protocol XML |
| `Avalonia` | Wayland app id and `CanResize=false` on the wire |
