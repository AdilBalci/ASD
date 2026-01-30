## 2024-05-22 - Systematic Missing Labels in Forms
**Learning:** The codebase frequently contains forms with implicit or missing label associations; explicit `htmlFor`/`id` pairs must be systematically added when modifying form components.
**Action:** Always check for `htmlFor` and `id` in forms and add them as a standard practice for accessibility.

## 2024-05-22 - Custom Modal Accessibility
**Learning:** Custom modals are implemented using `div` elements and require manual configuration of `role='dialog'`, `aria-modal='true'`, `aria-labelledby`, keyboard event handling (Escape key), and `autoFocus` on the first interactive element.
**Action:** Use a standard modal component or library if possible, otherwise manually implement these attributes and behaviors.
