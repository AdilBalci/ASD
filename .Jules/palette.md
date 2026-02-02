## 2026-02-02 - Accessibility Pattern: Explicit Label Associations
**Learning:** In this Next.js app, form inputs were consistently missing explicit `htmlFor`/`id` associations, relying on visual proximity which fails for screen readers. This pattern was prevalent in modals and detail pages.
**Action:** Systematically check all forms for `htmlFor` and `id` pairs. Use `autoFocus` on the first interactive element of modals to improve keyboard navigation.
