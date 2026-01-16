## 2024-05-22 - Sidebar Navigation Accessibility
**Learning:** The application uses a custom `NavItem` component for sidebar links but lacked the `aria-current` attribute. This makes it difficult for screen reader users to know which page is currently active.
**Action:** When working with custom navigation components, always verify that the active state is communicated semantically via `aria-current="page"`, not just visually with colors.
