import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  // webServer: {
  //   env: {
  //     NODE_ENV: 'development',
  //   },
  //   command: 'webpack serve -c webpack.config.demo.ts',
  //   port: 3000,
  // },
  projects: [
    {
      testDir: './e2e',
      name: 'Chrome Stable',
      use: {
        headless: false,
        browserName: 'chromium',
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
}
export default config
