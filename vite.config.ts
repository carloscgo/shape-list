import { PluginOption, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

interface ConfigExport {
  plugins: PluginOption[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  define: { [key: string]: any }
  test?: {
    globals: true
    environment: string
    setupFiles: string[]
    testMatch: string[]
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    VITE_APP_TITLE: `"${process.env.VITE_APP_TITLE}"`,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTest.ts'],
    testMatch: ['./__tests__/**/*.test.tsx'],
  },
} as ConfigExport)
