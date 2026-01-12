# Palette's Journal

## 2025-02-12 - Navigation Accessibility
**Learning:** Adding `aria-current="page"` to the active `Link` in Next.js is crucial for screen readers to identify the current page in a navigation list. This simple addition significantly improves the experience for assistive technology users.
**Action:** Always check `NavItem` or similar navigation components for `aria-current` prop usage. Also, `focus-visible` styles are essential for keyboard navigation visibility.
