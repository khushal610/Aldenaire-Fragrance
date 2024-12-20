import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['aos'],
    exclude: [
      "react-icons",
      // "aos",
      "typewriter-effect",
      "react/jsx-dev-runtime",
      "react-router-dom",
      "jwt-decode",
      "axios"
    ]
  }
});
