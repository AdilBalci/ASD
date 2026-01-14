## 2024-05-23 - Custom Modal Accessibility
**Learning:** Custom modal implementations using simple `div`s often miss critical accessibility attributes, making them invisible or confusing to screen reader users. Specifically, `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` are essential.
**Action:** When working with custom modals, always enforce these attributes and ensure focus management (e.g., `autoFocus` on the first input) is present. Check for `htmlFor`/`id` parity in all forms.
