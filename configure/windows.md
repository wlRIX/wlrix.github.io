---
layout: page
title: Windows
permalink: /configure/windows/
---

# Windows

Focus behavior, move and resize feedback, and the pointer, all in the compositor's file.

```toml
# ~/.config/wlrix/compositor.toml
[focus]
policy = "pointer"     # or "click", the default

[windows]
opaque_move = false    # show a red wireframe instead of the window itself
opaque_resize = false

[cursor]
theme = "sgi"          # an XCursor theme name, as installed under share/icons
size = 32
```

## Focus

`click` is the default: a window takes focus when you click it. `pointer` is focus-follows-mouse, which
is what 4Dwm shipped with and what most IRIX users left it on.

## Opaque move and resize

Both default to `false`, which is the period-correct behavior: dragging a window moves a **red
wireframe** and the window itself jumps to the new position on release. It is not a performance
compromise — it is what 4Dwm did, and what the desktop is meant to look like.

Set either to `true` if you would rather drag the window itself.

## Cursor

`theme` is an XCursor theme name, looked up under `share/icons` as usual. `sgi` is the IRIX pointer set;
falling back to `default` gets whatever your system has.

## Settings panel

`wlrix-settings-windows` writes these through the settings daemon.
