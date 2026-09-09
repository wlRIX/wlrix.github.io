---
layout: page
title: Session Manager
permalink: /components/wlrix-session/
component: wlrix-session
---

# Session Manager

<code>wlrix-session</code> &middot; Rust &middot; session manager (launches compositor and apps)

The wlRIX session manager. It starts `wlrix-compositor`, waits to learn the environment only the compositor can decide, starts the desktop's apps with it, and stays until the compositor exits.

It launches `wlrix-toolchest` and `wlrix-desks` **by name**, which is why `$PREFIX/bin` has to be on the PATH greetd hands the session. A build that runs by hand but fails under greetd is usually this.

## Repository

[wlrix-session](https://github.com/wlrix/wlrix-session)
