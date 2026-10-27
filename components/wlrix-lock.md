---
layout: page
title: Screen Locker
permalink: /components/wlrix-lock/
component: wlrix-lock
---

# Screen Locker

<code>wlrix-lock</code> &middot; Rust &middot; screen locker (ext-session-lock)

The wlRIX screen locker. Locks the session with `ext-session-lock-v1` and shows the time, the date, your picture and name, and a password field, over the same wallpaper options `wlrix-bg` takes.

The arrangement follows KDE Plasma's lock screen; the widgets are IRIX's Motif chrome. `wlrix-idle` runs it on a timeout and before the machine sleeps, in place of `swaylock`, and the compositor fails closed if it ever dies.

Your picture is the first of `~/.face.icon`, `~/.face` and the AccountsService copy that decodes — the files KDE's and GNOME's settings panels write, and User Accounts too. Like the greeter it ships its own PAM stack, picked with `PAM_FLAVOR`.

## Repository

[wlrix-lock](https://github.com/wlrix/wlrix-lock)
