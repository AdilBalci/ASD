# Palette's Journal

## 2025-02-09 - Accessible Modals and Navigation
**Learning:** Standard modal implementations often neglect ARIA roles, making them invisible or confusing to screen reader users. Simply adding `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` transforms a `div` into a recognized accessible pattern. Similarly, active navigation links need `aria-current="page"` to be more than just visually distinct.
**Action:** Always verify modals have `role="dialog"` and `aria-modal="true"`. Check navigation links for `aria-current`.
