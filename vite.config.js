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
        vozmozhnosti: resolve(__dirname, 'vozmozhnosti.html'),
        kalkulyator: resolve(__dirname, 'kalkulyator-kaspi.html'),
        kz_main: resolve(__dirname, 'kz/index.html'),
        kz_offer: resolve(__dirname, 'kz/offer.html'),
        kz_privacy: resolve(__dirname, 'kz/privacy.html'),
        kz_nakladnye: resolve(__dirname, 'kz/nakladnye-kaspi.html'),
        kz_repraiser: resolve(__dirname, 'kz/repraiser-kaspi.html'),
        kz_pribyl: resolve(__dirname, 'kz/pribyl-kaspi-pay.html'),
        kz_nkt: resolve(__dirname, 'kz/nkt-ntin-kaspi.html'),
        kz_vozmozhnosti: resolve(__dirname, 'kz/vozmozhnosti.html'),
        kz_kalkulyator: resolve(__dirname, 'kz/kalkulyator-kaspi.html'),
        komissiya_kaspi_magazin: resolve(__dirname, 'komissiya-kaspi-magazin.html'),
        porog_5000_kaspi_dostavka: resolve(__dirname, 'porog-5000-kaspi-dostavka.html'),
        kak_dobavit_tovar_kaspi: resolve(__dirname, 'kak-dobavit-tovar-kaspi.html'),
        pochemu_tovar_ne_prodaetsya_kaspi: resolve(__dirname, 'pochemu-tovar-ne-prodaetsya-kaspi.html'),
        kachestvo_magazina_kaspi: resolve(__dirname, 'kachestvo-magazina-kaspi.html'),
        kogda_kaspi_platit_prodavcu: resolve(__dirname, 'kogda-kaspi-platit-prodavcu.html'),
        stati: resolve(__dirname, 'stati.html'),
        notfound: resolve(__dirname, '404.html')
      }
    }
  }
});
