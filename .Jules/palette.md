## 2024-05-23 - Custom Modal Accessibility Pattern
**Learning:** The project uses custom `div`-based modals without a UI library. These default implementations lack critical accessibility attributes (`role="dialog"`, `aria-modal`) and focus management (autofocus, focus trapping, Escape key).
**Action:** When touching any modal in this repo, standard procedure is to add `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `htmlFor` on inputs, `autoFocus` on the first input, and an Escape key listener.
