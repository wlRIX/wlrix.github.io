---
layout: page
title: Desktop Icons
permalink: /components/wlrix-desktop/
component: wlrix-desktop
---

# Desktop Icons

<code>wlrix-desktop</code> &middot; Rust &middot; desktop icons (layer-shell background surface)

Shows the files in your XDG desktop directory as icons, IRIX-style.

Icons fill from the **top right of the primary monitor, downward**, starting a new column to the left when one runs out of room — the opposite corner and axis from the minimized-window tiles the compositor draws top-left, so the two grids grow away from each other.

Files and folders are drawn as coverage masks and tinted by state: knocked-back gray at rest, white under the pointer, and IRIX's lamp yellow when selected.

## Repository

[wlrix-desktop](https://github.com/wlrix/wlrix-desktop)
