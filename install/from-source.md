---
layout: page
title: From Source
permalink: /install/from-source/
---

# From Source

Everything happens in [`wlrix-epoch`](https://github.com/wlrix/wlrix-epoch). It pins a known-good set of
component commits and orchestrates building and packaging the whole desktop.

```sh
just build         # the Rust components, the GTK module, the local package feed, and the C# apps
sudo just install  # binaries, apps, data files, and the session entry
```

## Why install does not build

`install` deliberately does not build. It is normally run as root, and building as root leaves a target
directory nobody can write to afterwards. Each half can be run on its own:

```sh
just build-rust    just install-rust    # the Rust components
just build-c       just install-c       # wlrix-gtk-config
just build-cs      just install-cs      # the Avalonia theme and the applications
                   just install-assets  # icons, cursors, wallpapers and the sound theme
```

## Variables

| Variable | Default | Purpose |
|---|---|---|
| `PREFIX` | `/usr` | where things go |
| `DESTDIR` | *(empty)* | staged install, as a package build does |
| `PAM_FLAVOR` | `arch` | which PAM stacks the greeter and the locker install (`arch` or `debian`) |

```sh
sudo just install                # a system install, into /usr
DESTDIR=/tmp/stage just install  # staged, touches nothing
just uninstall                   # removes what install put down
```

`PAM_FLAVOR` travels in the environment rather than as a `just` variable. Only the greeter and the
locker read it — they are the two components shipping a PAM stack — and `just` refuses an override for
a variable a justfile does not declare, so passing it as one would break the rest.

## What lands

| Path | |
|---|---|
| `$PREFIX/bin/wlrix-{compositor,greeter,session,desktop,bg,idle,lock,tray,screenshot,settings-daemon,clipboard,sound,osd,network,power,bluetooth}` | the Rust components |
| `$PREFIX/bin/wlrix-{toolchest,desks,console,files,archiver,writer,imageview,clock,…}` | wrappers for the C# apps — the desktop's applications, settings panels and dialogs |
| `$PREFIX/bin/wlrix-{pkg,login,users,locale}-helper` | the privileged helpers, run only through pkexec |
| `$PREFIX/lib/wlrix/<app>/` | each C# app's published assemblies |
| `$PREFIX/share/polkit-1/actions/com.wlrix.*.policy` | the polkit actions that let those helpers run as root |
| `$PREFIX/lib/gtk-3.0/modules/libwlrix-gtk-config.so` | the GTK 3 module that keeps GTK applications in step with the scheme |
| `$PREFIX/share/wayland-sessions/wlrix.desktop` | the session entry a display manager offers |
| `$PREFIX/lib/xdg-desktop-portal-wlrix` (plus four data files) | the portal backend, bus-activated rather than started by name |
| `$PREFIX/share/dbus-1/services/com.wlrix.{Sound,Osd}.service` | bus activation for `wlrix-sound` and `wlrix-osd`, for callers outside a session |
| `$PREFIX/share/icons/{wlrix,sgi}/`, `$PREFIX/share/sounds/wlrix/` | the icon, cursor and sound themes |
| `/etc/gnupg/gpg-agent.conf` | `wlrix-pinentry` as gpg-agent's default — only written when no such file exists |

The `cs_apps` list near the top of `wlrix-epoch`'s justfile is the authoritative one; the table names
the shape rather than every application.

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

Most of them are a single binary and would have fitted a loop. Several are not: the greeter needs a
system account, two PAM stacks, a systemd unit and a greetd configuration; the locker a PAM stack of its
own; the session a launcher, a systemd user target and the entry a display manager offers; and the sound
and notification daemons their D-Bus activation files. That knowledge belongs with the files. Where a second copy of it lived in `wlrix-epoch` it drifted — the meta-repository went on
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

`build-cs` does the publishing, into `publish/<app>/` in `wlrix-epoch`, and `install-cs` only copies from
there. A publish run by `sudo just install` would leave root-owned `bin/` and `obj/` trees in
`wlrix-apps`, and every later build as yourself would fail on them. `RID=` therefore applies to
`build-cs`, not to `install-cs`.

The helpers' polkit actions name `/usr/bin/wlrix-*-helper` literally. Under any other `PREFIX` the
Software Manager, Login Settings and User Accounts' fingerprint switches cannot change anything, and
`install-cs` warns about it.

## The local package feed

`wlrix-apps` restores from `wlrix-apps/localfeed` as well as nuget.org, for packages nuget.org does not
have: the wlRIX theme and dialogs out of `wlrix-avalonia`, and a **patched `Avalonia.Wayland`** carrying
`CanResize=false` on the wire, xdg-activation, drag icons and popup grabs.

The feed is gitignored, so a fresh clone has to build it — `just feed`, which `build-cs` depends on.

The patched package cannot come straight out of `dotnet pack`; `tools/pack-avalonia-wayland.py` explains
why and does the reshaping. It refuses to build from an Avalonia checkout whose version is not the
release the apps pin, because the mismatch would otherwise surface as a `MissingMethod` at app startup
rather than as a build error.

## All the recipes

```sh
just init        # add the component and fork repos as submodules
just build       # build everything: Rust components, the GTK module, package feed, C# apps
just feed        # just the local package feed
just run         # launch the session for local testing
just nested      # run the compositor nested in the current session, fully isolated
just check-path  # check PATH finds the components that were just installed
just uninstall   # remove what install put down; configuration and logs stay
just clean       # clean all build artifacts, the feed included
```

`just --list` shows the rest: regenerating the palette and the GTK theme, and pointing the components at
a local `wlrix-ui` checkout while working on both sides at once.
