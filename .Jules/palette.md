## 2024-05-22 - Implicit Form Labels
**Learning:** The codebase frequently uses `label` followed by `input` without `htmlFor`/`id` association, breaking accessibility for screen readers and click targets.
**Action:** When touching any form, systematically add explicit `htmlFor`/`id` pairs and ensure `aria-label` is present for icon-only or implicit inputs.
