# wlrix.github.io

The wlRIX project site and wiki. Jekyll, published to GitHub Pages by
`.github/workflows/pages.yml`.

The repo's **Settings → Pages → Source** must be set to "GitHub Actions"; the
classic Pages builder would run Jekyll 3 in safe mode and cannot build this.

## Local

```sh
bundle install
bundle exec jekyll serve
```

## The look

The site is drawn in the desktop's own colors and geometry, taken from a
`wlrix-epoch` checkout beside this one rather than transcribed:

| | |
|---|---|
| `_data/schemes.yml` | written by `tools/sync-palette.py` from `wlrix-ui/src/palette/generated.rs` |
| `assets/img/scatter.png` | copied from `wlrix-assets/wallpapers/` |
| `assets/img/scatter-gotham.png` | written by `tools/make-scatter.py`; see its header for the invocation |
| `assets/img/titlebar/*/` | copied from `wlrix-assets/themes/wlRIX/assets/<scheme>/` |

Re-run the tools after the desktop's palette changes:

```sh
tools/sync-palette.py
```

`_sass/_bevel.scss` reproduces `wlrix-avalonia`'s `BevelBorder`, and
`_sass/_toolchest.scss` reproduces `ToolchestMenu.axaml`. Both name their
source; check against it before changing the geometry.

## Navigation

`_data/toolchest.yml` is the toolchest's contents. Adding a page means adding a
line there, not editing a template.
