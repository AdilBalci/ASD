## 2024-05-23 - Navigation Accessibility
**Learning:** Sighted users rely on color to identify the active page, but screen reader users were missing this context. The `aria-current="page"` attribute is the standard way to bridge this gap.
**Action:** Always add `aria-current="page"` to the active link in navigation components (`NavItem`, `Tabs`, etc.).
