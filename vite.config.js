import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/randomizer-redirect/', // <-- 在这里添加你的仓库名称
})
