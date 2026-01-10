## 2024-05-22 - [Accessibility] Navigation State
**Learning:** Screen readers cannot visually perceive the "active" color change in navigation menus. Adding `aria-current="page"` is the critical standard pattern to communicate which page is currently active to assistive technology users.
**Action:** Always verify that components with an "active" or "selected" visual state also have the corresponding ARIA attribute (`aria-current`, `aria-selected`, or `aria-pressed`).
