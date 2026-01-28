## 2025-02-12 - Accessibility: Forms and Modals
**Learning:** This app frequently uses implicit label associations or misses them entirely. Modals are often just `div`s without ARIA roles.
**Action:** Always check for `htmlFor`/`id` pairs on inputs and `role="dialog"`/`aria-modal="true"` on custom modals. Ensure keyboard focus is managed (e.g., `autoFocus`).
