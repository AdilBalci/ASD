## 2024-05-22 - Accessible Modals
**Learning:** Custom modals using `div`s often miss critical accessibility features like `role="dialog"`, `aria-modal="true"`, and keyboard support (Escape key). Native `<dialog>` or robust libraries are better, but if patching existing code, these attributes are minimum requirements.
**Action:** Always verify `role="dialog"`, `aria-labelledby`, and Escape key support when encountering custom modals.
