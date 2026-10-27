---
layout: page
title: System Sounds
permalink: /components/wlrix-sound/
component: wlrix-sound
---

# System Sounds

<code>wlrix-sound</code> &middot; Rust &middot; system sounds daemon (XDG sound themes)

Programs ask this daemon for a sound by name and it plays it through PipeWire, from an [XDG sound theme](https://specifications.freedesktop.org/sound-theme-spec/latest/) — by default the IRIX Indigo Magic soundscheme from [`wlrix-sounds`]({{ '/components/wlrix-sounds/' | relative_url }}).

Whether a sound plays is decided in one place: the theme, a master switch and a list of muted sounds all live here, so components only ask and a settings panel changes one file. It also means one PipeWire client instead of one per component, and that the compositor never touches audio.

`wlrix-session` starts it first among its apps, so the login sound has something to play it. If PipeWire is not running, sounds are dropped and the daemon tries again on the next one.

## Repository

[wlrix-sound](https://github.com/wlrix/wlrix-sound)
