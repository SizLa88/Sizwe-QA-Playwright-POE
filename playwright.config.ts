import { defineConfig } from '@playwright/test';

export default defineConfig({
    // Points to your customized Selenium-migrated source folder structure
    testDir: './UIBank/tests',

    // Maximum timeout per test set to 60 seconds (1 minute)
    timeout: 60000,

    // Global testing framework behaviors applied across all projects
    use: {
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
        
        // FIXED: Setting viewport to null overrides Playwright's fixed 1280x720 box restriction
        viewport: null
    },

    // Multi-Reporter Pipeline: Combines text progress, detailed HTML logging, and your custom Pie Chart dashboard
    reporter: [
        ['list'], // Prints live progress summaries directly to the terminal shell
        [
            'html',
            {
                outputFolder: 'UIBank/Reports',
                open: 'never' // Prevents a browser tab from forcefully popping open on headless server runners
            }
        ],
        ['./UIBank/fixtures/PieChartReporter.ts'] // Dynamically compiles the standalone custom pie chart dashboard
    ],

    // Target browser environments and execution platforms
    projects: [
        {
            name: 'Microsoft Edge',
            use: {
                browserName: 'chromium',
                channel: 'msedge',
                
                // FIXED: Forces the Microsoft Edge application window shell to launch completely maximized on your monitor
                launchOptions: {
                    args: ['--start-maximized']
                }
            }
        }
    ]
});
