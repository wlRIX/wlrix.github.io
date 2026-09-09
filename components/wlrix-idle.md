---
layout: page
title: Idle Manager
permalink: /components/wlrix-idle/
component: wlrix-idle
---

# Idle Manager

<code>wlrix-idle</code> &middot; Rust &middot; idle manager (blank, lock, before-sleep)

Watches how long the session has gone untouched, and blanks the screen, runs a locker, or takes whatever other action the config asks for — while listening to everything that has a right to say "not now".

It replaces the `swayidle` and `wlopm` pairing. Most importantly it **serves `org.freedesktop.ScreenSaver`**: Firefox, mpv and Steam ask the session not to blank while they are playing something, and without a listener that request goes nowhere and the screen blanks anyway.

Started by `wlrix-session` as part of the default session, so on a normal install there is nothing to set up.

## Repository

[wlrix-idle](https://github.com/wlrix/wlrix-idle)
