---
layout: page
title: About wlRIX
permalink: /help/about/
---

# About wlRIX

wlRIX recreates the IRIX desktop on Wayland: not as a theme over an existing desktop, but as its own
compositor, greeter, session, and applications, written to behave the way the originals did.

## Why

IRIX's Indigo Magic Desktop had a coherence that has mostly not survived. The chiselled Motif chrome, the
toolchest in the corner, the red wireframe when you dragged a window, the scatter dither behind
everything — these were one design, not a collection of preferences. Reproducing it faithfully means
reproducing the behavior as well as the pixels, which is why the components are written rather than
configured.

## Licensing

The desktop components are **GPL-3.0-or-later**.
[`wlrix-assets`]({{ '/components/wlrix-assets/' | relative_url }}) — the palette, icons, cursors and
wallpapers — is **MIT**, so the look-and-feel data is freely reusable outside the project.

wlRIX is not affiliated with or endorsed by Silicon Graphics or any successor. IRIX and Indigo Magic
are the marks of their owners; this is an independent reimplementation of a look and a set of behaviors,
built from published documentation and from the appearance of the original.

## This site

Built with [Jekyll](https://jekyllrb.com), hosted on GitHub Pages, and drawn in the desktop's own
colors — the palette here is generated from `wlrix-assets/palette/`, so the Classic and Gotham on this
page are the same values the compositor paints with. The scatter behind it is the wallpaper file itself.

## Source

Everything is on GitHub under [wlrix](https://github.com/wlrix), aggregated by
[`wlrix-epoch`](https://github.com/wlrix/wlrix-epoch).
