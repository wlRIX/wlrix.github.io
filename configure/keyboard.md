---
layout: page
title: Keyboard
permalink: /configure/keyboard/
---

# Keyboard

Keyboard layout, repeat and keybindings all live in the compositor's file.

```toml
# ~/.config/wlrix/compositor.toml
[keyboard]
layout = "jp"          # a comma-separated list, e.g. "jp,us", enables the toggle key
model = "jp106"
variant = ""
options = "grp:alt_shift_toggle"
repeat_delay = 200
repeat_rate = 25
```

These are XKB's own names, passed through to libxkbcommon. A comma-separated `layout` is what enables a
group-toggle key; the key itself comes from `options`.

`repeat_delay` and `repeat_rate` are milliseconds and repeats-per-second. Both are spelled out rather
than left empty so that a reload and a fresh start agree — an empty field means "let libxkbcommon pick",
and the two can pick differently.

## Keybindings

```toml
[keybinds]
"Ctrl+Q" = "close"
```

`[keybinds]` is the one section whose **entries merge** over the compositor's built-in defaults, rather
than replacing them. Which *file* wins is still decided the usual way: only one file's `[keybinds]` is
ever read.

Two bindings worth knowing, both built in:

| | |
|---|---|
| `Print` | drag a region out with [wlrix-screenshot]({{ '/components/wlrix-screenshot/' | relative_url }}) |
| `Alt+Print` | the active window, frame and all |

## Settings panel

`wlrix-settings-keyboard` writes the same keys through the settings daemon, which tells the compositor
to reload afterwards.
