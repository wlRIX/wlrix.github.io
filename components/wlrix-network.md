---
layout: page
title: Network
permalink: /components/wlrix-network/
component: wlrix-network
---

# Network

<code>wlrix-network</code> &middot; Rust &middot; network status (Wi-Fi icon in the tray)

NetworkManager's Wi-Fi state, as an icon in the tray: bars of signal while connected, a tooltip naming the network and its address, and a menu of nearby networks to join — secured ones included, through the `wlrix-network-prompt` password dialog. The menu's last row opens Network Settings.

It is a daemon with no window, publishing a StatusNotifierItem the tray draws, and shows nothing at all on a machine with no wireless device. NetworkManager only; iwd works as NetworkManager's Wi-Fi backend.

IRIX was a workstation operating system and never had to say which network it was on. This is one of the pieces that makes wlRIX usable on a laptop.

## Repository

[wlrix-network](https://github.com/wlrix/wlrix-network)
