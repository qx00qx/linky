import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  env: {
    files: ['.env'],
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/components/pages"),
      "@types": path.resolve(__dirname, 'src/types'),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@router": path.resolve(__dirname, "src/router"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@firebase-app": path.resolve(__dirname,"src/firebase")
    },
  },
})
