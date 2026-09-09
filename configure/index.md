---
layout: page
title: Configuration
permalink: /configure/
---

# Configuration

Every wlRIX component reads its own TOML file. The compositor reads `compositor.toml`, the background
reads `background.toml`, the idle manager reads `idle.toml`, and so on.

## Where the files live

Files are read from your own config directory first, then from `/etc/wlrix`:

```
~/.config/wlrix/<component>.toml
/etc/wlrix/<component>.toml
```

**The first file found wins outright.** wlRIX does not merge the two. What you see in your own file is
the whole of what you get, so copy the system file rather than starting an empty one — or use a settings
panel, which seeds your file from the system one on its first write.

The one exception is the compositor's `[keybinds]`, whose *entries* merge over the built-in defaults.
Which file wins is still decided the same way: only one file's `[keybinds]` is ever read.

## Unknown keys are an error

A typo in a config file does not get silently ignored. wlRIX refuses to start on an unknown key and says
which one. A silently dropped setting is a bad afternoon; a clear message is not.

## Who writes the files

You can edit them by hand. The settings panels do not — they go through
[`wlrix-settings-daemon`]({{ '/components/wlrix-settings-daemon/' | relative_url }}), which is the only
program that writes wlRIX config files, and which tells the owning process to reload afterwards.

The desktop works without the daemon. It is a writer and a notifier, never a source of truth.

## Pages

- [Color Schemes]({{ '/configure/schemes/' | relative_url }})
- [Background]({{ '/configure/background/' | relative_url }})
- [Keyboard]({{ '/configure/keyboard/' | relative_url }})
- [Windows]({{ '/configure/windows/' | relative_url }})
