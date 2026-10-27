---
layout: post
title: The site goes up
summary: documentation, a wiki, and somewhere to put release notes.
author: the wlRIX project
---

There is now somewhere to read about wlRIX that is not a README.

[Installation]({{ '/install/' | relative_url }}) covers the build from
[`wlrix-epoch`](https://github.com/wlrix/wlrix-epoch) — the prerequisites, what lands where, the
variables that move it, and the two steps the greeter's installer deliberately leaves to the
administrator. [Configuration]({{ '/configure/' | relative_url }}) covers the TOML files: schemes,
background, keyboard and windows, and the rule that catches everyone the first time, which is that your
config file replaces the system one outright rather than merging with it.

[Components]({{ '/components/' | relative_url }}) has a page per repository.

The site is drawn in the desktop's own colors. The palette is generated from
`wlrix-assets/palette/`, so Classic and Gotham here are the same values the compositor paints with, and
the scatter behind this page is the wallpaper file itself, tiled at native size the way `wlrix-bg` tiles
it. The toolchest on the left is the real one's geometry — the bevel is four rectangles rather than a
border, with only the top-left corner reading light.
