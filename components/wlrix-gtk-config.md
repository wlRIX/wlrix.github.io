---
layout: page
title: GTK Module
permalink: /components/wlrix-gtk-config/
component: wlrix-gtk-config
---

# GTK Module

<code>wlrix-gtk-config</code> &middot; C &middot; GTK 3 module (scheme reloads and dark mode)

A GTK 3 module that finishes what the wlRIX GTK stylesheets cannot reach. The stylesheets in `wlrix-assets` give a GTK 3 window an IRIX titlebar; three things stay wrong afterwards that no CSS can fix, and this module does those and nothing else.

GTK 3 reads the user's `gtk.css` once and never again, so a scheme change reached only applications started after it — the module watches the file and reloads it. GTK 3 reserves headerbar room for a subtitle whether there is one or not — the module clears that, so the titlebar is 30 pixels. And GTK 3 ignores the portal's light-or-dark setting — the module follows it.

`start-wlrix` loads it by name through `GTK_MODULES`. It is C because every operation that matters is raw GObject pointer work either way.

## Repository

[wlrix-gtk-config](https://github.com/wlrix/wlrix-gtk-config)
