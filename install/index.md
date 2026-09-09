---
layout: page
title: Installation
permalink: /install/
---

# Installation

wlRIX is built from source. There are no distribution packages yet, so every install goes through
[`wlrix-epoch`](https://github.com/wlrix/wlrix-epoch), the meta-repository that pins a known-good set of
component commits and builds them together.

1. **[Prerequisites]({{ '/install/prerequisites/' | relative_url }})** — the toolchains and system
   libraries the build needs.
2. **[Quick Start]({{ '/install/quick-start/' | relative_url }})** — the short version, for a machine
   that already has the prerequisites.
3. **[From Source]({{ '/install/from-source/' | relative_url }})** — the full build, what lands where,
   the variables that move it, and the two steps the installer leaves to you.

If a build runs by hand but fails under your display manager, go straight to the
[PATH section]({{ '/install/from-source/#the-path-gotcha' | relative_url }}) — that is nearly always
what it is.
