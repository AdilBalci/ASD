## 2026-01-18 - Custom Modal Accessibility
**Learning:** The project uses custom `div`-based modals which lack native accessibility features like `dialog` element would provide.
**Action:** When working on modals, manually ensure `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `Escape` key handling, and initial focus management are implemented.
