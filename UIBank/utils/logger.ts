import * as fs from 'fs';
import * as path from 'path';

export class Logger {
    // Defines the directory and file paths for permanent runtime file logging
    private static readonly LOG_DIR = path.resolve(process.cwd(), 'Logs');
    private static readonly LOG_FILE = path.join(Logger.LOG_DIR, 'execution.log');

    /**
     * Generates a standardized, human-readable timestamp layout: YYYY-MM-DD HH:mm:ss
     */
    private static getTimestamp(): string {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toTimeString().split(' ')[0];
        return `${date} ${time}`;
    }

    /**
     * Appends the console string to a physical execution log file for archival tracking
     */
    private static writeToFile(logEntry: string): void {
        try {
            if (!fs.existsSync(this.LOG_DIR)) {
                fs.mkdirSync(this.LOG_DIR, { recursive: true });
            }
            // Appends cleanly to the log file with a newline break character
            fs.appendFileSync(this.LOG_FILE, logEntry + '\n', 'utf-8');
        } catch (error) {
            console.error(`[CRITICAL] Failed writing runtime traces directly to file storage: ${error}`);
        }
    }

    /**
     * Standardized formatter to structure messages uniformly across all output channels
     */
    private static formatMessage(level: 'INFO' | 'WARN' | 'ERROR', message: string): string {
        return `[${level}] [${this.getTimestamp()}] ${message}`;
    }

    /**
     * Logs general execution progress steps to stdout and file logs
     * Replaces Java's System.out.println()
     */
    public static info(message: string): void {
        const entry = this.formatMessage('INFO', message);
        console.log(entry);
        this.writeToFile(entry);
    }

    /**
     * Logs non-fatal framework anomalies or expected element fallbacks
     */
    public static warn(message: string): void {
        const entry = this.formatMessage('WARN', message);
        console.warn(entry);
        this.writeToFile(entry);
    }

    /**
     * Logs severe execution errors, exceptions, and test failures to stderr and file logs
     * Replaces Java's System.err.println() or e.printStackTrace()
     */
    public static error(message: string, error?: any): void {
        const entry = this.formatMessage('ERROR', message);
        console.error(entry);
        this.writeToFile(entry);

        if (error) {
            const errorDetails = error instanceof Error ? error.stack || error.message : String(error);
            console.error(errorDetails);
            this.writeToFile(`[STACK TRACE] ${errorDetails}`);
        }
    }

    /**
     * Clears previous history run logs to ensure a fresh trace file for new test execution pipelines
     */
    public static clearLogs(): void {
        try {
            if (fs.existsSync(this.LOG_FILE)) {
                fs.unlinkSync(this.LOG_FILE);
            }
        } catch (error) {
            console.error(`[CRITICAL] Could not purge old log files safely: ${error}`);
        }
    }
}
