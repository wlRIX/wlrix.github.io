---
layout: page
title: Sound Theme
permalink: /components/wlrix-sounds/
component: wlrix-sounds
---

# Sound Theme

<code>wlrix-sounds</code> &middot; data &middot; the wlrix sound theme (IRIX soundscheme)

The default system sound theme: the IRIX Indigo Magic desktop soundscheme, arranged as a [freedesktop sound theme](https://specifications.freedesktop.org/sound-theme-spec/latest/) named `wlrix`. `wlrix-sound` plays it, and libcanberra finds it by name for GTK applications.

The sounds were created by **R.C. Underwood, Roger Powell and Jeff Essex** for the Indigo Magic Desktop in IRIX 5.3. They were never released under a license, so this repository is **not** covered by wlRIX's MIT or GPL licenses; the only terms are the credit line R.C. Underwood asked for: *IRIX desktop sounds courtesy the SGI desktop.*

Each IRIX sound is stored once, under the name wlRIX plays it by, and every other freedesktop name for it is a symlink. Names the theme lacks fall through to the stock `freedesktop` theme.

## Repository

[wlrix-sounds](https://github.com/wlrix/wlrix-sounds)
