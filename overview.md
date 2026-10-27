---
layout: page
title: Overview
permalink: /overview/
---

# Overview

wlRIX is a desktop environment for Wayland that recreates the look and feel of **IRIX** — SGI's Unix,
and specifically its 4Dwm window manager and Indigo Magic Desktop.

It is not a theme over an existing desktop. The compositor, the greeter, the session manager, the
desktop icons, the background painter, the idle manager and screen locker, the tray and its network,
power and Bluetooth indicators, the notifications, the system sounds, the clipboard history, the
screenshot tool, the portal backend and the applications are all wlRIX's own, written to behave the way
the originals did.

## What that means in practice

**The chrome is drawn, not borrowed.** The compositor draws its own server-side decorations: a
30-pixel titlebar, a 2-pixel Motif bevel, a 1-pixel hard outline. The bevel is four filled rectangles
rather than a border, and they are deliberately asymmetric, so only the top-left corner reads light.
That asymmetry is most of why a Motif widget looks like a Motif widget.

**The colors are transcribed, not approximated.** The palette comes out of IRIX 6.5's own X11 scheme
files, verbatim, and everything downstream is generated from it — the Rust components, the Avalonia
theme, the GTK stylesheets for non-wlRIX applications, and this website.

**The behavior is period-correct by default.** Dragging a window moves a red wireframe. Desktop icons
fill from the top right downward while minimized-window tiles fill from the top left, so the two grids
grow away from each other. The toolchest sits in the top-left corner and its menus fly out to the right.

## The component model

Each part of the desktop is an independent git repository.
[`wlrix-epoch`](https://github.com/wlrix/wlrix-epoch) is the meta-repository: it pins a known-good set of
component commits and orchestrates building and packaging the whole thing — the same arrangement Pop!\_OS
uses for COSMIC's `cosmic-epoch`.

During day-to-day development you work in sibling clones under a workspace root. At release time,
`wlrix-epoch` bumps its submodule pointers to the tested commit set and tags `epoch-X.Y.Z`. That tag is
the reproducible-build source of truth.

See [Components]({{ '/components/' | relative_url }}) for what each one does.

## Getting it

There are no distribution packages yet. See [Installation]({{ '/install/' | relative_url }}).

## Licensing

The desktop is GPL-3.0-or-later. [`wlrix-assets`]({{ '/components/wlrix-assets/' | relative_url }}) — the
palette, icons, cursors and wallpapers — is MIT, so the look-and-feel data is freely reusable outside the
project. [`wlrix-sounds`]({{ '/components/wlrix-sounds/' | relative_url }}) is the exception to both: the
IRIX sounds were never released under a license, and carry only the credit their author asked for.
