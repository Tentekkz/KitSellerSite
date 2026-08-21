import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        offer: resolve(__dirname, 'offer.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        nakladnye: resolve(__dirname, 'nakladnye-kaspi.html')
      }
    }
  }
});
