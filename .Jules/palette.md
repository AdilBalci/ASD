## 2024-05-22 - Active Navigation State
**Learning:** Visual cues like background color changes for active navigation links are invisible to screen readers. The `aria-current="page"` attribute is critical for strictly communicating "you are here" to assistive technology.
**Action:** Ensure all navigation components accept an `active` state that conditionally applies `aria-current="page"`.
