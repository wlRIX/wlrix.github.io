---
layout: page
title: Bluetooth
permalink: /components/wlrix-bluetooth/
component: wlrix-bluetooth
---

# Bluetooth

<code>wlrix-bluetooth</code> &middot; Rust &middot; Bluetooth status and pairing agent

BlueZ's adapter and paired devices, as an icon in the tray: whether Bluetooth is on and what is connected at a glance, and a menu that switches the radio and connects or disconnects paired devices in a click, with the battery of those that report one.

It is also BlueZ's default pairing agent, so pairing from Bluetooth Settings can ask whether a headset shows the same number. The dialog is `wlrix-bluetooth-prompt`, in the applications. Every agent call is checked to come from BlueZ itself.

Nothing at all on a machine with no adapter. The last of the laptop pieces, beside the network, power and notification daemons.

## Repository

[wlrix-bluetooth](https://github.com/wlrix/wlrix-bluetooth)
