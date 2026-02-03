## 2024-05-23 - Inaccessible Custom Modals
**Learning:** The application uses custom `div`-based modals that lack standard accessibility attributes (`role="dialog"`, `aria-modal="true"`) and label associations. This renders them invisible or confusing to screen reader users.
**Action:** When encountering custom modals, systematically add `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` linked to the modal title. Ensure the first interactive element has `autoFocus`.
