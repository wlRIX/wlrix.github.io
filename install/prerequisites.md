---
layout: page
title: Prerequisites
permalink: /install/prerequisites/
---

# Prerequisites

## Build tools

| Tool | Why |
|---|---|
| [`just`](https://github.com/casey/just) | every component's build is a justfile; `cargo install just` or your distribution's package |
| Rust toolchain | the ten Rust components; edition 2024, so a recent stable |
| .NET SDK 10.0 | the C# half — the Avalonia theme and the applications |
| `git` | the components are submodules of `wlrix-epoch` |
| Python 3 | a few of the build tools, including the package reshaper |

The Rust and C# halves are independent. `just build-rust` and `just build-cs` each work on their own,
so a machine without the .NET SDK can still build and run the compositor, greeter and session — it just
will not have the toolchest or the settings panels.

## System libraries

The compositor is the component with real system dependencies. Arch package names:

```
wayland  libinput  seatd  mesa  libxkbcommon
```

`mesa` is there for gbm, EGL and GLESv2. On other distributions you want the development packages for
the same libraries.

## Runtime

| | |
|---|---|
| [greetd](https://git.sr.ht/~kennylevinsen/greetd) | the greeter is a greetd front-end; the daemon holds the PAM conversation |
| PAM | an `arch` or `debian` stack ships with the greeter; pick with `PAM_FLAVOR` |
| systemd | the greeter installs a unit, and the session a user target |
| .NET runtime 10.0 | the applications are published framework-dependent, so the target needs it |
| `xdg-desktop-portal` | for screen sharing; the wlRIX backend is bus-activated |
