## 2024-05-23 - Custom Modal Accessibility
**Learning:** Custom modals using `div` elements require manual handling of `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and keyboard events (Escape key) to be accessible. A simple focus trap and backdrop click handler significantly improve the experience.
**Action:** When implementing custom modals, always create a reusable accessible wrapper or ensure these attributes and event listeners are present.
