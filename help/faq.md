---
layout: page
title: FAQ
permalink: /help/faq/
---

# Frequently Asked Questions

## Is there a package for my distribution?

Not yet. Everything is built from source through
[`wlrix-epoch`]({{ '/install/from-source/' | relative_url }}).

## It runs with `just run` but fails under my display manager.

Almost always PATH. The greeter starts `wlrix-session` and the session starts the compositor and the
applications **by name**, so `$PREFIX/bin` has to be on the PATH greetd hands the session. `just
check-path` runs the check on its own; see
[the PATH gotcha]({{ '/install/from-source/#the-path-gotcha' | relative_url }}).

## I installed a new build and nothing changed.

Also PATH, from the other direction. Installing under two prefixes leaves two complete sets, and PATH
order picks the winner. `/usr/local/bin` comes before `/usr/bin` on most systems, so the **older** set
keeps running. `PREFIX` defaults to `/usr` to match what each component's justfile defaults to.

## Do I need the .NET SDK?

Only for the C# half — the Avalonia theme and the applications, including the toolchest, the file
manager and the settings panels. `just build-rust` and `just install-rust` work on their own, and give you a working compositor,
greeter and session without it.

## The file manager does not show my USB stick.

Install and start **udisks2**. Without it the file manager falls back to reading what is already
mounted, so it cannot see a disk that has been plugged in and not yet mounted, and it has no way to mount
one. Phones in file-transfer mode are a separate path, through libmtp.

## An application will not open, or opens with no window.

If it is an X11 application, the usual reason is that **Xwayland** is not installed (`xorg-xwayland` on
Arch). The compositor starts it with the session, and a session without it still starts, so the first
sign is an X11 program that silently fails.

## My saved passwords and SSH keys are not unlocked at login.

Install **GNOME Keyring**. `start-wlrix` starts it when it is present and exports `SSH_AUTH_SOCK` if its
socket turns up. For the keyring to unlock with your login password, add `pam_gnome_keyring` to the
`wlrix-greeter` PAM service, which is the one that authenticates whoever is logging in.

## Notifications sometimes look wrong, or come from mako or dunst.

`wlrix-osd` is the notification server, and only one can be installed. With mako or dunst still there,
anything sent outside a wlRIX session can D-Bus-activate the other one. Uninstall it.

## Why does dragging a window show a wireframe?

Because 4Dwm did. It is the default, not a limitation. `opaque_move` and `opaque_resize` in
[the windows configuration]({{ '/configure/windows/' | relative_url }}) turn it off.

## My config file has one key in it and everything else went back to default.

That is the design. wlRIX takes the **first config file it finds and does not merge** — your file
replaces the system one outright, so what is in it is the whole of what you get. Copy
`/etc/wlrix/<component>.toml` and edit the copy.

The one exception is the compositor's `[keybinds]`, whose entries merge over the built-in defaults.

## The desktop will not start and says something about an unknown key.

Also the design. Unknown keys are an error rather than being ignored, because a silently dropped setting
is much harder to debug than a refused one. The message names the key.

## Can I use the colors in my own project?

Yes. [`wlrix-assets`]({{ '/components/wlrix-assets/' | relative_url }}) is MIT, separately from the
GPL-3.0-or-later desktop, precisely so the palette and artwork are reusable. See
[Color Schemes]({{ '/configure/schemes/' | relative_url }}).

## Is this affiliated with SGI?

No. It is an independent reimplementation of a look and a set of behaviors.
