---
layout: page
title: Background
permalink: /components/wlrix-bg/
component: wlrix-bg
---

# Background

<code>wlrix-bg</code> &middot; Rust &middot; desktop background (wallpaper)

Paints the wallpaper, one `wlr-layer-shell` surface per monitor. It replaces `swaybg`, which was the last third-party client in the core wlRIX session.

It decodes the original IRIX artwork directly — SGI images (`.rgb`, `.rgba`, `.bw`, `.sgi`) and XPM — so `background.toml` can point at a file off an Indy rather than at a PNG somebody converted.

It also has a config file, which `swaybg` does not: `swaybg` takes its wallpaper on argv, once, at process start.

See [Background]({{ '/configure/background/' | relative_url }}) for the settings.

## Repository

[wlrix-bg](https://github.com/wlrix/wlrix-bg)
