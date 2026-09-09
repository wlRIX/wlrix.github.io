---
layout: page
title: Applications
permalink: /components/wlrix-apps/
component: wlrix-apps
---

# Applications

<code>wlrix-apps</code> &middot; C# &middot; user apps (toolchest, desks, settings, ...)

The wlRIX user-facing applications: one .NET solution with a project per app plus a shared `Wlrix.Common` library, recreating the IRIX Interactive Desktop surface.

Among them the **Toolchest** — the menu in the top-left corner of the screen, and the model for this site's own navigation — plus Desks, Console, the Settings panels, the Source Picker, the Software Manager and the Shutdown dialog.

They are published framework-dependent, so the target needs the .NET runtime installed; bundling a copy with each app is a lot of megabytes for a desktop already built from source.

## Repository

[wlrix-apps](https://github.com/wlrix/wlrix-apps)
