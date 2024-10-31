const { test, expect } = require("@playwright/test");

test.describe("Task Management - Drag and Drop", () => {
  test("Should allow dragging a task to a new position", async ({ page }) => {
    await page.goto("http://localhost:8080/task", { waitUntil: "domcontentloaded" });

    const task1 = page.locator('li:has-text("Task 1")');
    const task4 = page.locator('li:has-text("Task 4")');

    // Kéo Task 1 xuống vị trí của Task 3 
    await task1.dragTo(task4, {});

    // Kiểm tra rằng Task 1 hiện đã ở vị trí mới
    const tasks = await page.locator("#taskList li").allTextContents();
    expect(tasks).toEqual(["Task 2", "Task 3", "Task 1", "Task 4"]);
  });
});
