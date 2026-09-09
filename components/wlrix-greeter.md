---
layout: page
title: Greeter
permalink: /components/wlrix-greeter/
component: wlrix-greeter
---

# Greeter

<code>wlrix-greeter</code> &middot; Rust &middot; greetd greeter (login screen)

The wlRIX login greeter: a [greetd](https://git.sr.ht/~kennylevinsen/greetd) front-end presenting the IRIX-style login screen, after IRIX's `clogin`.

The greeter never checks a password. greetd runs as root, holds the PAM conversation and starts the session; the greeter only relays the questions PAM wants asked and hands back the answers. Everything security-relevant is on the other side of the socket.

It is the component with the most to install: a system account, two PAM stacks, a systemd unit and a greetd configuration. See [From Source]({{ '/install/from-source/' | relative_url }}) for the two steps its installer leaves to the administrator.

## Repository

[wlrix-greeter](https://github.com/wlrix/wlrix-greeter)
