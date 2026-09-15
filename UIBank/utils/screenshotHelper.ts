import { Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

export class ScreenshotHelper {
    /**
     * Captures browser viewport states using the native Playwright Page instance.
     * Replaces Java Selenium's TakesScreenshot and FileUtils.copyFile mechanisms.
     * 
     * @param page Playwright active browser context page instance
     * @param screenshotName Filename string descriptor prefix
     */
    public static async takeScreenshot(page: Page, screenshotName: string): Promise<string> {
        let screenshotPath = "";

        try {
            // Replaces: new File("Screenshots") and mkdirs()
            const screenshotDir = path.resolve(process.cwd(), "Screenshots");
            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir, { recursive: true });
            }

            // FIXED: Generates a flawless, safe timestamp format replacing Java's SimpleDateFormat("yyyyMMdd_HHmmss")
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            const timestamp = `${year}${month}${day}_${hours}${minutes}${seconds}`;

            screenshotPath = `Screenshots/${screenshotName}_${timestamp}.png`;
            const absolutePath = path.resolve(process.cwd(), screenshotPath);

            // Replaces Selenium's getScreenshotAs(OutputType.FILE)
            await page.screenshot({ path: absolutePath });
            console.log(`Screenshot saved: ${screenshotPath}`);

        } catch (error) {
            console.log("Failed to capture screenshot.");
            console.error(error);
        }

        return screenshotPath;
    }
}
