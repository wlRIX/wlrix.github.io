---
layout: page
title: Portal Backend
permalink: /components/xdg-desktop-portal-wlrix/
component: xdg-desktop-portal-wlrix
---

# Portal Backend

<code>xdg-desktop-portal-wlrix</code> &middot; Rust &middot; xdg-desktop-portal backend (screen sharing, screenshots)

Implements `org.freedesktop.impl.portal.ScreenCast` and `org.freedesktop.impl.portal.Screenshot`, which is what `xdg-desktop-portal` hands an application's screen-sharing and screenshot requests to — so Firefox, OBS and anything else that asks for a screen gets one.

It also implements `org.freedesktop.impl.portal.Settings`, which is how a GTK or Qt application is told what the desktop looks like. That is where the active scheme's light/dark flag reaches non-wlRIX applications.

Started by D-Bus activation, not by hand and not by `wlrix-session`. On a normal install there is nothing to set up.

## Repository

[xdg-desktop-portal-wlrix](https://github.com/wlrix/xdg-desktop-portal-wlrix)
