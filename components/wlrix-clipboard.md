---
layout: page
title: Clipboard History
permalink: /components/wlrix-clipboard/
component: wlrix-clipboard
---

# Clipboard History

<code>wlrix-clipboard</code> &middot; Rust &middot; clipboard history daemon

Remembers what was copied — text and images — and puts any of it back on request. It is a daemon with no window, after KDE's Klipper; the popup that shows the history is `wlrix-clipboard-history` in the applications, opened with `Super+V` or **Desktop ▸ Clipboard History** in the Toolchest.

It also keeps the clipboard full. On Wayland the clipboard belongs to the program that copied, and goes empty when that program exits — copy from a terminal, close it, and there is nothing to paste. When that happens this daemon puts the entry back. Starred entries are never evicted and survive clearing the history.

## Repository

[wlrix-clipboard](https://github.com/wlrix/wlrix-clipboard)
