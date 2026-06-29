#!/usr/bin/env python3
"""Compatibility entrypoint for the repo-docs validator.

The maintained implementation lives in scripts/validate_repo_docs.py. Keep this
thin wrapper so older invocations keep working without maintaining two copies.
"""

from __future__ import annotations

import runpy
from pathlib import Path


SCRIPT = Path(__file__).resolve().parent / "scripts" / "validate_repo_docs.py"


if __name__ == "__main__":
    runpy.run_path(str(SCRIPT), run_name="__main__")
