---
layout: page
title: Shared Drawing
permalink: /components/wlrix-ui/
component: wlrix-ui
---

# Shared Drawing

<code>wlrix-ui</code> &middot; Rust &middot; shared drawing primitives and palette (library)

The drawing primitives and the color palette shared by wlRIX's Rust components. The compositor draws window frames and menus, the greeter a Motif login dialog, the desktop icons and a menu, and the locker, screenshot tool, tray and notifications more of the same — all the same IRIX chrome, which until this crate existed was copied by hand from one to the next and quietly diverging.

It holds the Motif bevel geometry, the widgets (buttons, text fields, arrows), a single text-shaping setup, and the palette generated from `wlrix-assets`.

It is a library. It installs nothing, and the components depend on it by pinned git revision so each still builds from a fresh standalone clone.

## Repository

[wlrix-ui](https://github.com/wlrix/wlrix-ui)
