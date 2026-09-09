#!/usr/bin/env python3
"""Generate a scatter tile in the style of the IRIX desktop wallpaper.

wlRIX ships wlrix-assets/wallpapers/scatter.png: a 100x100 two-color field,
dithered per pixel at roughly 50/50, tiled rather than stretched (a 100-pixel
dither scaled across a 4K screen turns to mush -- see wlrix-bg's
data/background.toml.in). The randomness is what makes it tile seamlessly:
there is no structure for a seam to interrupt.

The shipped tile is Classic's, in Classic's colors. Dark mode needs the same
treatment in Gotham's, hence this. Pure stdlib, so the site has no build-time
image dependency.

The Gotham tile in assets/img was produced with:

    tools/make-scatter.py assets/img/scatter-gotham.png '#1b1b1b' '#2e344b'

(Gotham's `desktop` and `view-background` roles.) The seed is fixed, so
re-running it reproduces the same bytes.
"""

from __future__ import annotations

import argparse
import random
import struct
import sys
import zlib
from pathlib import Path

SIZE = 100
SEED = 0x5C477E12


def rgb(text: str) -> tuple[int, int, int]:
    value = text.lstrip("#")
    if len(value) != 6:
        raise argparse.ArgumentTypeError(f"expected #rrggbb, got {text!r}")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def chunk(kind: bytes, payload: bytes) -> bytes:
    """One PNG chunk: length, type, payload, CRC over type+payload."""
    return (
        struct.pack(">I", len(payload))
        + kind
        + payload
        + struct.pack(">I", zlib.crc32(kind + payload) & 0xFFFFFFFF)
    )


def scatter(size: int, a: tuple[int, int, int], b: tuple[int, int, int]) -> bytes:
    """8-bit RGB rows, each prefixed with filter type 0 (None) as PNG requires."""
    rand = random.Random(SEED)
    rows = bytearray()
    for _ in range(size):
        rows.append(0)
        for _ in range(size):
            rows.extend(a if rand.random() < 0.5 else b)
    return bytes(rows)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path)
    parser.add_argument("first", type=rgb, help="one of the two colors, #rrggbb")
    parser.add_argument("second", type=rgb, help="the other, #rrggbb")
    parser.add_argument("--size", type=int, default=SIZE)
    args = parser.parse_args()

    header = struct.pack(">IIBBBBB", args.size, args.size, 8, 2, 0, 0, 0)  # 8-bit, truecolor
    png = (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", header)
        + chunk(b"IDAT", zlib.compress(scatter(args.size, args.first, args.second), 9))
        + chunk(b"IEND", b"")
    )
    args.output.write_bytes(png)
    print(f"make-scatter: wrote {args.output} ({len(png)} bytes)", file=sys.stderr)


if __name__ == "__main__":
    main()
