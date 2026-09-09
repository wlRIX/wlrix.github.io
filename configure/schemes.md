---
layout: page
title: Color Schemes
permalink: /configure/schemes/
---

# Color Schemes

IRIX shipped its colors as X11 scheme files, and wlRIX transcribes them verbatim. The palette is
[`wlrix-assets`]({{ '/components/wlrix-assets/' | relative_url }})' `palette/` directory, and everything
else — the Rust components, the Avalonia theme, the GTK stylesheets, and
<em>this website</em> — is generated from it.

## The schemes

| Id | Scheme | |
|---|---|---|
| `classic` | Indigo Magic, gamma 1.7 | the default |
| `classic-g10` | the same, gamma 1.0 | |
| `classic-g24` | the same, gamma 2.4 | |
| `gotham` | Gotham, gamma 1.7 | dark |

`classic-g10` and `classic-g24` are not separate designs. IRIX baked the same scheme for three display
gammas; all three ship, and 1.7 is the default because it reads closest to the original on an sRGB
display.

## Setting it

The scheme is a **fan-out key**. Setting it once through the settings daemon writes it to every component
that draws anything:

```
appearance.palette
```

which expands to `compositor.appearance.palette`, `desktop.appearance.palette`,
`portal.appearance.palette`, `screenshot.appearance.palette` and `tray.appearance.palette`.

By hand, that is the `[appearance]` section of each component's own file:

```toml
# ~/.config/wlrix/compositor.toml
[appearance]
palette = "gotham"
```

An empty or unrecognized id falls back to the default and logs a warning in that component's log. The key
is a string rather than an enumeration on purpose: a build that does not know a scheme should say so and
carry on, not refuse to parse the file.

## Non-wlRIX applications

GTK and Qt applications are told what the desktop looks like by
[the portal backend]({{ '/components/xdg-desktop-portal-wlrix/' | relative_url }}), over
`org.freedesktop.impl.portal.Settings`. It reports the active scheme's light/dark flag, so a browser
follows the desktop into Gotham without being configured separately.

The GTK stylesheets themselves ship in `wlrix-assets/themes/wlRIX/`, one CSS file per scheme for both
GTK 3 and GTK 4.

## This site

The two schemes on this page are the desktop's own. Light mode is `classic` and dark mode is `gotham`,
both read straight out of the palette — the colors here are not an approximation of the desktop's, they
are the same values. Use the **Scheme** button at the foot of the toolchest to switch, or leave it alone
and the site follows your system.
