---
layout: page
title: Compositor
permalink: /components/wlrix-compositor/
component: wlrix-compositor
---

# Compositor

<code>wlrix-compositor</code> &middot; Rust &middot; Wayland compositor (4Dwm-style window management)

The wlRIX Wayland compositor. It recreates the window-management look and feel of IRIX's **4Dwm** and the Indigo Magic Desktop — window borders, focus behavior, and the Rooms/desks model — on modern Linux graphics.

Built on [Smithay](https://github.com/Smithay/smithay), pinned to a git revision in `Cargo.toml`. It draws its own server-side decorations: a 30-pixel titlebar, a 2-pixel Motif bevel, and a 1-pixel hard outline, in the colors of the active scheme.

It also owns the keybindings. `Print` and `Alt+Print` reach `wlrix-screenshot`, and the window menu and desk switching are the compositor's own.

## Repository

[wlrix-compositor](https://github.com/wlrix/wlrix-compositor)
