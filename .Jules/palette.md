## 2024-05-23 - Form Accessibility Pattern
**Learning:** Consistently found form inputs without `id`s and labels without `htmlFor` associations across the application. This forces screen reader users to guess the input purpose.
**Action:** Systematically add `htmlFor`/`id` pairs to all new form components and use `aria-label` for inputs with visual-only labels (like search bars).
