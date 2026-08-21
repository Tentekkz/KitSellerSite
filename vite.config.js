import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        offer: resolve(__dirname, 'offer.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        nakladnye: resolve(__dirname, 'nakladnye-kaspi.html'),
        repraiser: resolve(__dirname, 'repraiser-kaspi.html'),
        pribyl: resolve(__dirname, 'pribyl-kaspi-pay.html'),
        nkt: resolve(__dirname, 'nkt-ntin-kaspi.html'),
        vozmozhnosti: resolve(__dirname, 'vozmozhnosti.html')
      }
    }
  }
});
