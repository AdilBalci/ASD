## 2024-05-23 - Accessibility Patterns in Student Modal
**Learning:** Implicit label associations (wrapping input in label) were inconsistent or not present, requiring a shift to explicit `htmlFor`/`id` pairings for robust accessibility and testing.
**Action:** Systematically use explicit `htmlFor` and `id` attributes for all form inputs to ensure screen reader compatibility and reliable test locators.
