## 2024-05-22 - Manual Modal Accessibility
**Learning:** Custom modals implemented as `div`s can be made accessible with standard HTML attributes (`role="dialog"`, `aria-modal="true"`) and a simple React `useEffect` for keyboard handling (Escape key), without needing heavy external libraries.
**Action:** When encountering other custom modals in this codebase, apply the same pattern: add ARIA roles/labels, trap focus (or at least focus initial element), and handle Escape key manually.
