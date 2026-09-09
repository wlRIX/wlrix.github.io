---
layout: page
title: Settings Daemon
permalink: /components/wlrix-settings-daemon/
component: wlrix-settings-daemon
---

# Settings Daemon

<code>wlrix-settings-daemon</code> &middot; Rust &middot; settings service (the only writer of the config files)

The one program that **writes** the wlRIX config files, behind `com.wlrix.Settings` on the session bus.

Every component still reads its own TOML file, and always will — the compositor reads `compositor.toml`, `wlrix-idle` reads `idle.toml`, and none of them has gained a dependency on this. What it replaces is the *writing*: without it, every settings app would hand-roll a TOML editor, a pidfile read and a `SIGHUP`, and each copy would have to learn a different owning process's reload story.

**The desktop works without it.** It is a writer and a notifier, never a source of truth. A session with this binary removed is a complete session — just one where settings apps have nothing to talk to.

## Repository

[wlrix-settings-daemon](https://github.com/wlrix/wlrix-settings-daemon)
