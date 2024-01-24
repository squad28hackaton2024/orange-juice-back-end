import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vitest-tsconfig-paths'

export default defineConfig({
    test: {
        globals: true
    },
    plugins: [tsConfigPaths()]
})