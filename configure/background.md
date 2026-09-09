---
layout: page
title: Background
permalink: /configure/background/
---

# Background

[`wlrix-bg`]({{ '/components/wlrix-bg/' | relative_url }}) paints the wallpaper, one layer-shell surface
per monitor, from `background.toml`.

```toml
# ~/.config/wlrix/background.toml
image = "/path/to/picture.png"   # absent, or "", is the color alone
mode  = "fill"                   # tile | center | fit | fill | stretch | solid
color = "#555555"                # letterbox bars, and the whole screen under solid
```

Your own file replaces the system one at `/etc/wlrix/background.toml` **outright** — wlRIX takes the
first config file it finds and does not merge — so copy that file rather than starting an empty one.

## Modes

| Mode | |
|---|---|
| `tile` | repeat at native size |
| `center` | native size, centered, `color` around it |
| `fit` | scale to fit inside the screen, `color` in the bars |
| `fill` | scale to cover the screen, cropping the overflow |
| `stretch` | scale to the screen exactly, ignoring the aspect ratio |
| `solid` | `color` alone; no image is read |

## Per-monitor overrides

`[[output]]` sections, keyed by connector name, each field falling back to the top-level one:

```toml
image = "/usr/share/wlrix/wallpapers/scatter.png"
mode  = "tile"

[[output]]
name  = "DP-1"
image = "/home/you/pictures/indy.rgb"
mode  = "fit"
```

## The scatter

The default is the IRIX scatter: a two-color dither, 100×100, that tiles seamlessly — the randomness is
what makes the seams invisible.

```toml
image = "/usr/share/wlrix/wallpapers/scatter.png"
mode = "tile"
color = "#555555"
```

The mode is `tile` rather than the built-in default of `fill` for a reason: stretching a 100-pixel dither
across a 4K screen turns the pattern to mush. `#555555` is the palette's `desktop` role, the gray IRIX
put under everything, and it is only ever seen if the image goes missing — a tile leaves nothing
uncovered. If `wlrix-assets` is not installed the path does not exist, and `wlrix-bg` says so on stderr
and falls back to the color: a plain gray desktop, not a failure.

*(It is also what is tiled behind this page.)*

## The original artwork

`wlrix-bg` decodes SGI images (`.rgb`, `.rgba`, `.bw`, `.sgi`) and XPM directly, not just PNG and JPEG.
A wallpaper copied off an Indy can be pointed at as it is, without conversion.
