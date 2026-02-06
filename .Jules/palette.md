# Palette's Journal

## 2026-02-06 - Missing Form Label Associations
**Learning:** The application consistently lacks explicit `htmlFor` and `id` associations in forms, with labels and inputs rendered as siblings without connection. This breaks accessibility for screen reader users.
**Action:** When modifying any form, systematically add unique `id`s to inputs and corresponding `htmlFor` attributes to labels.
