## 2024-05-23 - Missing Form Label Associations
**Learning:** The codebase heavily relies on visual proximity for form labels, often omitting `htmlFor`/`id` attributes. This breaks standard browser behaviors (clicking label to focus input) and screen reader support.
**Action:** When touching any form component, systematically add explicit `htmlFor` on labels and corresponding `id` on inputs.
