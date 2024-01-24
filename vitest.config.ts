import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vitest-tsconfig-paths'

export default defineConfig({
    test: {
        globals: true,
        environmentMatchGlobs: [
			['src/controller/**', 'prisma']
		]
    },
    plugins: [tsConfigPaths()]
})