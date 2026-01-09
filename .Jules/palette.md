## 2026-01-09 - Navigation Accessibility Pattern
**Learning:** The custom `NavItem` component used manual active state styling but missed the semantic `aria-current="page"` attribute, making navigation state invisible to screen readers.
**Action:** Always verify custom navigation components for `aria-current`. Added consistent `focus-visible` styles to ensure keyboard users can clearly see their position in the navigation.
