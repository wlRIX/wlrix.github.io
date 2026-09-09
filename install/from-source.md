---
layout: page
title: From Source
permalink: /install/from-source/
---

# From Source

Everything happens in [`wlrix-epoch`](https://github.com/wlrix/wlrix-epoch). It pins a known-good set of
component commits and orchestrates building and packaging the whole desktop.

```sh
just build         # the Rust components, the local package feed, and the C# apps
sudo just install  # binaries, apps, and the session entry
```

## Why install does not build

`install` deliberately does not build. It is normally run as root, and building as root leaves a target
directory nobody can write to afterwards. Either half can be run on its own:

```sh
just build-rust    just install-rust
just build-cs      just install-cs
```

## Variables

| Variable | Default | Purpose |
|---|---|---|
| `PREFIX` | `/usr` | where things go |
| `DESTDIR` | *(empty)* | staged install, as a package build does |
| `PAM_FLAVOR` | `arch` | which PAM stack the greeter installs (`arch` or `debian`) |

```sh
sudo just install                # a system install, into /usr
DESTDIR=/tmp/stage just install  # staged, touches nothing
just uninstall                   # removes what install put down
```

`PAM_FLAVOR` travels in the environment rather than as a `just` variable. Only the greeter reads it, and
`just` refuses an override for a variable a justfile does not declare, so passing it as one would break
the other four components.

## What lands

| Path | |
|---|---|
| `$PREFIX/bin/wlrix-{compositor,greeter,session,desktop,bg,idle,tray,screenshot,settings-daemon}` | the Rust components |
| `$PREFIX/bin/wlrix-{toolchest,desks,console,settings-keyboard,settings-windows,settings-schemes,source-picker,software-manager,shutdown}` | wrappers for the C# apps |
| `$PREFIX/lib/wlrix/<app>/` | each C# app's published assemblies |
| `$PREFIX/share/wayland-sessions/wlrix.desktop` | the session entry a display manager offers |
| `$PREFIX/lib/xdg-desktop-portal-wlrix` (plus four data files) | the portal backend, bus-activated rather than started by name |

## The PATH gotcha

The greeter starts `wlrix-session`, which starts `wlrix-compositor`, both **by name** — so `$PREFIX/bin`
has to be on the PATH greetd hands the session. That is the usual reason a build that runs by hand fails
under greetd. The same goes for the applications: `wlrix-session` starts `wlrix-toolchest` and
`wlrix-desks` by name too.

Being started by name is also why `PREFIX` defaults to `/usr`, matching what each component's own
justfile defaults to. Installing under two prefixes does not conflict — it leaves two complete sets, and
PATH order picks the winner. `/usr/local/bin` comes before `/usr/bin` on most systems, so the **older**
set keeps running and installing the new one appears to do nothing at all.

`install` finishes by checking for exactly that, and `just check-path` runs the check on its own.

## The components install themselves

`install-rust` does not copy binaries. It runs `just install` in each component, with `PREFIX` and
`DESTDIR` passed down.

Three of the five are a single binary and would have fitted a loop. The other two are not: the greeter
needs a system account, two PAM stacks, a systemd unit and a greetd configuration, and the session needs
a launcher, a systemd user target and the entry a display manager offers. That knowledge belongs with the
files. Where a second copy of it lived in `wlrix-epoch` it drifted — the meta-repository went on
installing the session's `wlrix.desktop` for a while after the session had moved the file.

## The two remaining steps

The greeter's install prints both, and both need root:

```sh
systemd-sysusers && systemd-tmpfiles --create
systemctl enable wlrix-greeter.service
```

The first creates the greeter's account. The second makes it the display manager, replacing the
distribution's `greetd.service` — the same daemon on the same VT.

## The C# apps

A published .NET app is a directory — a launcher plus its assemblies — so each one goes under
`$PREFIX/lib/wlrix/` and gets a one-line wrapper in `$PREFIX/bin`. Not a symlink: the .NET host looks for
an app's assemblies beside `/proc/self/exe`, which resolves symlinks, so a link in `bin` would send it
hunting for them in `bin`.

They are published **framework-dependent**, so the target needs the .NET runtime installed. They are also
published for **one platform**, detected from the SDK and overridable with `RID=`. Avalonia carries
native libraries for every platform it supports, and a publish that names none copies all of them — 550
MB per app against 26 MB.

## The local package feed

`wlrix-apps` restores from `wlrix-apps/localfeed` as well as nuget.org, for packages nuget.org does not
have: the wlRIX theme and dialogs out of `wlrix-avalonia`, and a **patched `Avalonia.Wayland`** carrying
app-id support and `CanResize=false` on the wire.

The feed is gitignored, so a fresh clone has to build it — `just feed`, which `build-cs` depends on.

The patched package cannot come straight out of `dotnet pack`; `tools/pack-avalonia-wayland.py` explains
why and does the reshaping. It refuses to build from an Avalonia checkout whose version is not the
release the apps pin, because the mismatch would otherwise surface as a `MissingMethod` at app startup
rather than as a build error.

## All the recipes

```sh
just init      # add the component and fork repos as submodules
just build     # build everything: Rust components, package feed, C# apps
just feed      # just the local package feed
just run       # launch the session for local testing
just clean     # clean all build artifacts, the feed included
```
