## 2024-05-22 - Modal and Form Accessibility Patterns
**Learning:** Custom modals are implemented as `div`s without accessibility attributes. Forms often lack `htmlFor`/`id` associations.
**Action:** When touching modals, always add `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`. Ensure all form inputs have explicit label associations.
