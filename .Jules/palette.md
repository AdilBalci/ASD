## 2024-05-22 - Improving Navigation Accessibility
**Learning:** Visual indicators of "active" states (like background color) are invisible to screen reader users. The `aria-current="page"` attribute is the standard way to communicate this state programmatically.
**Action:** Always add `aria-current="page"` to the active navigation link in any Sidebar or Menu component.
