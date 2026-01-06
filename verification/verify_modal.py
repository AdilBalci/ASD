from playwright.sync_api import sync_playwright

def verify_student_modal():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the student page
        page.goto("http://localhost:3000/panel/ogrenciler")

        # Click the "Yeni Öğrenci" button
        page.click("text=Yeni Öğrenci")

        # Check if modal is visible
        modal = page.locator("div[role='dialog']")
        if modal.is_visible():
            print("Modal is visible")

            # Check for aria-labelledby
            labeled_by = modal.get_attribute("aria-labelledby")
            print(f"Modal labeled by: {labeled_by}")

            # Check input with autoFocus
            focused_element = page.evaluate("document.activeElement.getAttribute('name')")
            # The input doesn't have a name attribute in the code, so let's check value or class or surrounding label

            # Take screenshot of the modal
            page.screenshot(path="verification/modal_accessibility.png")
        else:
            print("Modal not found")

        browser.close()

if __name__ == "__main__":
    verify_student_modal()
