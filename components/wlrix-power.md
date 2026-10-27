---
layout: page
title: Power
permalink: /components/wlrix-power/
component: wlrix-power
---

# Power

<code>wlrix-power</code> &middot; Rust &middot; power status (battery icon in the tray)

The battery, as an icon in the tray: its charge and whether it is charging, a tooltip with the percentage and the time left, notifications when it runs low, and a menu to switch power modes. Nothing at all on a machine with no battery.

It reads UPower's display device — the machine's batteries added together — and power-profiles-daemon for the modes, which are listed only when that daemon runs and only the ones it offers.

It is `wlrix-power` rather than wlrix-battery because the menu also holds the power modes.

## Repository

[wlrix-power](https://github.com/wlrix/wlrix-power)
