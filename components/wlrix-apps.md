---
layout: page
title: Applications
permalink: /components/wlrix-apps/
component: wlrix-apps
---

# Applications

<code>wlrix-apps</code> &middot; C# &middot; user apps (toolchest, desks, settings, ...)

The wlRIX user-facing applications: one .NET solution with a project per app plus a shared `Wlrix.Common` library, recreating the IRIX Interactive Desktop surface.

Among them the **Toolchest** — the menu in the top-left corner of the screen, and the model for this site's own navigation — plus Desks, Console, the file manager, an archiver, a text editor, an image viewer, a clock, the icon catalog, the clipboard history popup, the Software Manager and the Shutdown dialog.

The **Settings panels** cover keyboard, mouse and touchpad, displays, audio and sounds, background, color schemes, windows, international, network, Bluetooth, power, login, user accounts and default applications. Behind them sit the system dialogs: the polkit authentication agent, the GnuPG pinentry, the Wi-Fi and Bluetooth pairing prompts, and the Source Picker for screen sharing.

The file manager lists and mounts disks through **udisks2**, and shows phones in MTP mode through libmtp.

They are published framework-dependent, so the target needs the .NET runtime installed; bundling a copy with each app is a lot of megabytes for a desktop already built from source.

## Repository

[wlrix-apps](https://github.com/wlrix/wlrix-apps)
