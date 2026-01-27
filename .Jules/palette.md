## 2024-10-24 - Modal Accessibility & Form Labels
**Learning:** Custom modals implemented as `div`s missed semantic roles (`role="dialog"`) and keyboard interactions (`Escape` key). Labels appeared visually but lacked `htmlFor`/`id` association, breaking accessibility.
**Action:** When auditing modals, always check for `role="dialog"`, `aria-modal="true"`, focus management, and `Escape` support. For forms, verify explicit `htmlFor`/`id` association using accessibility-focused selectors like `get_by_label`.
