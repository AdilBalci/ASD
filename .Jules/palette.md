## 2026-01-26 - Accessibility in Navigation Components
**Learning:** The application's navigation components (`NavItem`) relied solely on visual cues (background color) for active state, creating a barrier for screen reader users.
**Action:** Always ensure `aria-current="page"` is applied to active navigation links, and verify focus indicators are visible against the specific background color (e.g., use `focus-visible:ring-blue-500` on dark sidebars).
