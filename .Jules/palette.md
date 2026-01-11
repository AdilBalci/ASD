# Palette's Journal

## 2024-05-22 - Navigation Accessibility
**Learning:** `NavItem` components often rely solely on visual cues (colors) for active states, leaving screen reader users unaware of their current location.
**Action:** Always add `aria-current="page"` to the active navigation link to programmatically communicate the current page.
