# SelectLayersByPlayhead ⏭️

Two tiny After Effects scripts that select layers **by where they sit relative to the playhead** — everything after it, or everything before it. Built to live on a pair of hotkeys.

## What they do

Park the playhead, run one of the scripts:

| Script | Selects |
|---|---|
| `SelectFollowingLayers.jsx` | Every layer that **starts at or after** the playhead (in-point to the right of the time cursor) |
| `SelectPreviousLayers.jsx` | Every layer that **already ended** at the playhead (out-point to the left of the time cursor) |

Layers the playhead is sitting *inside* are left out by default, so you get a clean "everything from here on" or "everything up to here". Your old selection is replaced, locked layers are skipped, and it's one undo step.

```
                 playhead
                    │
  ████ A            │                 ← Previous
        ██████ B    │                 ← Previous
             ███████│██████ C         ← straddles: neither (by default)
                    │███████ D        ← Following
                    │      █████ E    ← Following
```

Great for: pushing the rest of an edit down the timeline, deleting everything after a cut, or recoloring / precomposing a whole section in one go.

## Installation

### As Regular Scripts
- Place both `.jsx` files in your **Scripts** folder and run via **File → Scripts**:
  ```
  Windows: C:\Program Files\Adobe\Adobe After Effects [version]\Support Files\Scripts\
  macOS:   /Applications/Adobe After Effects [version]/Scripts/
  ```

### As Hotkeys (recommended)
- Keep the `.jsx` files anywhere and trigger them from your hotkey tool of choice, e.g. AutoHotkey:
  ```ahk
  run, "<path-to-AfterFX.exe>" -r "C:\path\to\SelectFollowingLayers.jsx"
  run, "<path-to-AfterFX.exe>" -r "C:\path\to\SelectPreviousLayers.jsx"
  ```

## Usage

1. **Open a composition.**
2. **Move the playhead** to your split point.
3. **Run** `SelectFollowingLayers` or `SelectPreviousLayers`.

## Options

Both scripts share the same config block at the top:

| Option | Default | What it does |
|---|---|---|
| `DIRECTION` | `1` / `-1` | `1` = following (right of the playhead), `-1` = previous (left). This is the only difference between the two files. |
| `INCLUDE_STRADDLING` | `false` | `true` = also take layers the playhead sits inside |
| `ADD_TO_SELECTION` | `false` | `true` = keep the current selection and add to it |
| `SKIP_LOCKED` | `true` | Leave locked layers alone (After Effects can't select them anyway) |

## Notes

- A layer that starts **exactly on** the playhead counts as *following*; one that ends exactly on it counts as *previous* (quarter-frame tolerance, so sub-frame drift doesn't matter).
- Nothing happens if no composition is active.

## Requirements

- Adobe After Effects (any version with scripting support)

## License

MIT
