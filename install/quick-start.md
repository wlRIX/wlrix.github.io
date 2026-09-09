---
layout: page
title: Quick Start
permalink: /install/quick-start/
---

# Quick Start

For a machine that already has the [prerequisites]({{ '/install/prerequisites/' | relative_url }}).

```sh
git clone https://github.com/wlrix/wlrix-epoch
cd wlrix-epoch
just init          # add the components and forks as submodules
just build         # Rust components, the local package feed, then the C# apps
sudo just install  # binaries, apps, and the session entry
```

Then the two steps the installer deliberately leaves to you, both of which need root:

```sh
systemd-sysusers && systemd-tmpfiles --create
systemctl enable wlrix-greeter.service
```

The first creates the greeter's system account. The second makes wlRIX the display manager — it
**replaces** your distribution's `greetd.service`, being the same daemon on the same VT. Reboot, or
restart the service, and the greeter comes up.

## Trying it without installing

`just run` launches the session — compositor plus applications — inside your current desktop, for
local testing. It does not need `just install` to have run and it does not touch your display manager.

```sh
just run
```

## Undoing it

```sh
just uninstall
```

That removes what `install` put down. It does not remove the greeter's system account or disable the
service, so do those by hand if you want the machine fully back.
