---
layout: page
title: Notifications
permalink: /components/wlrix-osd/
component: wlrix-osd
---

# Notifications

<code>wlrix-osd</code> &middot; Rust &middot; notifications and on-screen display

The `org.freedesktop.Notifications` server — what `notify-send`, a browser's "download complete" and a chat client's new message all go to — with each notification drawn as a small fixed-size 4Dwm window, stacked in a corner of the screen. It replaces mako or dunst, and only one notification server can be installed at a time.

IRIX had no notification daemon, so there is no original to copy. The nearest native thing is a small window, and that is what a notification is: the beveled frame, a titlebar with the application's name, and the message in the body.

It is also the on-screen display for the volume, microphone and brightness keys: the compositor passes the key on, and `wlrix-osd` changes the level, through PipeWire or logind, and shows the bar.

## Repository

[wlrix-osd](https://github.com/wlrix/wlrix-osd)
