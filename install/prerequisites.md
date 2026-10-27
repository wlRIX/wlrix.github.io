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
| Rust toolchain | the seventeen Rust components and the shared `wlrix-ui` crate; edition 2024, so a recent stable |
| clang | the PipeWire bindings that `wlrix-sound` and the portal backend build against |
| a C compiler and `pkg-config` | `wlrix-gtk-config`, the one C component |
| .NET SDK 10.0 | the C# half — the Avalonia theme and the applications |
| `git` | the components are submodules of `wlrix-epoch` |
| Python 3 | a few of the build tools, including the package reshaper |

The Rust, C and C# halves are independent. `just build-rust`, `just build-c` and `just build-cs` each
work on their own, so a machine without the .NET SDK can still build and run the compositor, greeter
and session — it just will not have the toolchest, the file manager or the settings panels.

## System libraries

These are what the build links against. Arch package names:

```
wayland  libinput  seatd  mesa  libdrm  libxkbcommon  systemd-libs  pipewire  gtk3
```

| Package | Needed by |
|---|---|
| `wayland`, `libinput`, `seatd`, `libxkbcommon`, `libdrm`, `systemd-libs` | the compositor (`systemd-libs` for libudev) |
| `mesa` | the compositor and the portal backend, for gbm, EGL and GLESv2 |
| `pipewire` | `wlrix-sound` and the portal backend |
| `gtk3` | `wlrix-gtk-config`, the GTK 3 module that keeps GTK applications in step with the scheme |

On other distributions you want the development packages for the same libraries — on Debian and
Ubuntu, for instance, `libpipewire-0.3-dev`, `libspa-0.2-dev` and `libgbm-dev` for the PipeWire and gbm
parts. A missing one usually shows up only as a link error from `cargo build`.

## Runtime

### Required

| | |
|---|---|
| [greetd](https://git.sr.ht/~kennylevinsen/greetd) | the greeter is a greetd front-end; the daemon holds the PAM conversation |
| PAM | an `arch` or `debian` stack ships with the greeter and the locker; pick with `PAM_FLAVOR` |
| systemd | the greeter installs a unit, and the session a user target; suspend and hibernate go through logind |
| .NET runtime 10.0 | the applications are published framework-dependent, so the target needs it |
| PipeWire | system sounds, the volume keys (through its PulseAudio server), and screen sharing |
| polkit | the administrator prompts behind the Software Manager, Login Settings and User Accounts |
| `xdg-desktop-portal` | screen sharing and file choosers; the wlRIX backend is bus-activated |
| udisks2 | the file manager's devices rail — listing, mounting and unmounting disks and USB sticks |

Without udisks2 the file manager still runs, but it can only show what is already mounted: it cannot
see a stick that has been plugged in and not yet mounted, and it has no way to mount one.

### Recommended

| | |
|---|---|
| Xwayland (`xorg-xwayland`) | X11 applications. The compositor starts it with the session; without it the session still starts, with a warning, but anything that only speaks X11 will not run |
| GNOME Keyring (`gnome-keyring`) | a secrets store and SSH agent. `start-wlrix` starts it when present, and adding `pam_gnome_keyring` to the `wlrix-greeter` PAM stack unlocks it with your login password |

### For the hardware you have

Each of these is optional. The component that reads it shows nothing at all when it is missing, rather
than an error.

| | |
|---|---|
| NetworkManager | the Wi-Fi icon and menu (`wlrix-network`) and Network Settings; iwd works as its backend |
| UPower | the battery icon and low-battery warnings (`wlrix-power`), and the idle manager's on-battery profile |
| power-profiles-daemon | the power modes in the battery menu |
| BlueZ | the Bluetooth icon, pairing and Bluetooth Settings (`wlrix-bluetooth`) |
| AccountsService | User Accounts, and the account pictures the greeter and lock screen show |
| fprintd | fingerprint enrollment in User Accounts, and fingerprint `sudo` and polkit |
| libmtp | phones and media players plugged in over USB, in the file manager's devices rail |
| `7z` (`7zip`) | lets the archiver write 7z archives as well as read them |

### Conflicts

`wlrix-osd` is the notification server, and only one program can be. If mako or dunst is installed,
dbus-daemon has two activation files for `org.freedesktop.Notifications` and picks one arbitrarily for
anything sent outside a wlRIX session. Uninstall the other daemon; `wlrix-osd`'s install says so when it
finds one.
