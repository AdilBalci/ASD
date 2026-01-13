## 2024-05-22 - Accessibility in Modal Forms
**Learning:** Adding `autoFocus` to the first input in a modal significantly improves keyboard accessibility by immediately trapping focus where the user needs it. Explicitly associating labels with inputs via `htmlFor`/`id` is critical for screen readers, especially in dense forms.
**Action:** Always add `autoFocus` to the primary input of a new modal and ensure all form inputs have matching `id` and label `htmlFor` attributes.

## 2024-05-22 - Navigation State for Screen Readers
**Learning:** Visually active navigation links are insufficient for screen readers. The `aria-current="page"` attribute is the standard way to communicate which link represents the current page.
**Action:** Always include `aria-current={active ? 'page' : undefined}` in navigation components.
