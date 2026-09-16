import { defineConfig } from '@playwright/test';

export default defineConfig({

    // Test Location
    testDir: './UIBank/tests',

    // Increased from 60 sec to 3 min
    timeout: 180000,

    // Reduce concurrency to avoid UIBank throttling/timeouts
    workers: 1,

    // Prevent excessive parallel execution
    fullyParallel: false,

    use: {

        // Faster and more stable for CI/Test Runs
        headless: true,

        // Screenshot capture
        screenshot: 'only-on-failure',

        // Video retention
        video: 'retain-on-failure',

        // Trace retention
        trace: 'retain-on-failure',

        // Extra navigation timeout
        navigationTimeout: 120000,

        // Extra action timeout
        actionTimeout: 30000,

        viewport: {
            width: 1920,
            height: 1080
        }
    },

    reporter: [

        ['list'],

        [
            'html',
            {
                outputFolder: 'UIBank/Reports',
                open: 'never'
            }
        ]
    ],

    projects: [
        {
            name: 'Microsoft Edge',

            use: {

                browserName: 'chromium',

                channel: 'msedge',

                viewport: {
                    width: 1920,
                    height: 1080
                },

                launchOptions: {

                    args: [

                        '--start-maximized',

                        '--disable-dev-shm-usage',

                        '--disable-gpu',

                        '--no-sandbox'
                    ]
                }
            }
        }
    ]
});