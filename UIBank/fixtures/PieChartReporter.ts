import { Reporter, FullResult, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { Logger } from '../utils/logger';

export default class PieChartReporter implements Reporter {
    private passedTests = 0;
    private failedTests = 0;
    private skippedTests = 0;
    private testRecords: Array<{ name: string; status: string; duration: number; error?: string; screenshot?: string; video?: string }> = [];

    // Replaces: ITestListener.onTestStart & onTestSuccess / onTestFailure / onTestSkipped
    onTestEnd(test: TestCase, result: TestResult) {
        let finalStatus = result.status.toUpperCase();
        
        if (result.status === 'passed') {
            this.passedTests++;
            finalStatus = 'PASSED';
        } else if (result.status === 'failed' || result.status === 'timedOut') {
            this.failedTests++;
            finalStatus = 'FAIL';
        } else if (result.status === 'skipped') {
            this.skippedTests++;
            finalStatus = 'SKIPPED';
        }

        // Intercept failure screenshot attachments cleanly
        const screenshotAttachment = result.attachments.find(a => a.name === 'screenshot' || a.contentType?.includes('image'));
        let relativeScreenshotPath = '';
        if (screenshotAttachment && screenshotAttachment.path) {
            relativeScreenshotPath = path.relative(path.resolve(process.cwd(), 'UIBank/Reports'), screenshotAttachment.path);
        }

        // Intercept captured framework video clips to expose links dynamically inside the dashboard
        const videoAttachment = result.attachments.find(a => a.name === 'video' || a.contentType?.includes('video'));
        let relativeVideoPath = '';
        if (videoAttachment && videoAttachment.path) {
            relativeVideoPath = path.relative(path.resolve(process.cwd(), 'UIBank/Reports'), videoAttachment.path);
        }

        this.testRecords.push({
            name: test.title,
            status: finalStatus,
            duration: result.duration,
            error: result.errors && result.errors.length > 0 ? result.errors.map(e => e.message).join('\n') : undefined,
            screenshot: relativeScreenshotPath,
            video: relativeVideoPath
        });
    }

    // Replaces: ITestListener.onFinish & ExtentReports.flush()
    onEnd(result: FullResult) {
        const totalTests = this.passedTests + this.failedTests + this.skippedTests;
        
        // Replaces JFreeChart mathematical angular slice boundaries
        const passDeg = totalTests > 0 ? (this.passedTests / totalTests) * 360 : 0;
        const failDeg = totalTests > 0 ? (this.failedTests / totalTests) * 360 : 0;
        const failBound = passDeg + failDeg;

        // Dynamically map rows, ensuring badging checks evaluate true and attach video hyperlinks
        const tableRows = this.testRecords.map(t => `
            <tr>
                <td><strong>${t.name}</strong></td>
                <td><span class="badge ${t.status === 'PASSED' ? 'success' : t.status === 'FAIL' ? 'danger' : 'warning'}">${t.status}</span></td>
                <td>${(t.duration / 1000).toFixed(2)}s</td>
                <td>
                    ${t.error ? `<div class="error-msg">${t.error.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>` : '<span style="color:#868e96;">N/A - Completed Safely</span>'}
                    ${t.screenshot ? `<br><a href="${t.screenshot}" target="_blank" class="screenshot-link">🖼️ View Failure Screenshot</a>` : ''}
                    ${t.video ? `<br><a href="${t.video}" target="_blank" class="screenshot-link" style="color:#1c7ed6; margin-left: 10px;">🎥 Play Failure Video</a>` : ''}
                </td>
            </tr>
        `).join('');

        const templatePath = path.resolve(process.cwd(), 'UIBank/fixtures/dashboard-template.html');
        if (!fs.existsSync(templatePath)) {
            Logger.error(`[EXTENT ERROR] Dashboard layout template was missing at path: ${templatePath}`);
            return;
        }

        let htmlContent = fs.readFileSync(templatePath, 'utf-8');

        // FIXED: Enforced strict regular expressions with global flags (/g) to guarantee full text data substitution
        htmlContent = htmlContent
            .replace(/__PASS_DEG__/g, passDeg.toFixed(2))
            .replace(/__FAIL_BOUND__/g, failBound.toFixed(2))
            .replace(/__TIMESTAMP__/g, new Date().toISOString().replace('T', ' ').substring(0, 19))
            .replace(/__TOTAL__/g, totalTests.toString())
            .replace(/__PASSED__/g, this.passedTests.toString())
            .replace(/__FAILED__/g, this.failedTests.toString())
            .replace(/__SKIPPED__/g, this.skippedTests.toString())
            .replace(/__TABLE_ROWS__/g, tableRows);

        const reportDir = path.resolve(process.cwd(), 'UIBank/Reports');
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }

        const reportPath = path.join(reportDir, 'AutomationReport.html');
        fs.writeFileSync(reportPath, htmlContent, 'utf-8');
        
        console.log(`[EXTENT] Report Path: ${reportPath}`);
        console.log(`[EXTENT] Pie Chart Generated: UIBank/Reports/AutomationReport.html`);
        console.log(`[EXTENT] FLUSHING REPORT`);

        // AUTOMATIC OPEN ENGINE: Launches the static file directly in your browser window context natively
        const openCommand = process.platform === 'win32' ? `start "" "${reportPath}"` :
                            process.platform === 'darwin' ? `open "${reportPath}"` :
                            `xdg-open "${reportPath}"`;

        exec(openCommand, (error) => {
            if (error) {
                Logger.error(`Failed to automatically display report dashboard view: ${error.message}`);
            } else {
                Logger.info(`🌐 Extent-style dashboard dashboard page displayed successfully.`);
            }
        });
    }
}
