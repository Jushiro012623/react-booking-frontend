import 'path'
import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return {
        plugins: [react(), tsconfigPaths()],
        server:{
            host: '0.0.0.0',
            proxy: { 
                '/api/v1': {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                },
            }
        }
    }
})