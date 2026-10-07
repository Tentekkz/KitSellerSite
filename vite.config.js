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
        kz_komissiya_kaspi_magazin: resolve(__dirname, 'kz/komissiya-kaspi-magazin.html'),
        kz_porog_5000_kaspi_dostavka: resolve(__dirname, 'kz/porog-5000-kaspi-dostavka.html'),
        kz_kak_dobavit_tovar_kaspi: resolve(__dirname, 'kz/kak-dobavit-tovar-kaspi.html'),
        kz_pochemu_tovar_ne_prodaetsya_kaspi: resolve(__dirname, 'kz/pochemu-tovar-ne-prodaetsya-kaspi.html'),
        raspolozhenie_prodavcov_kaspi: resolve(__dirname, 'raspolozhenie-prodavcov-kaspi.html'),
        kz_raspolozhenie_prodavcov_kaspi: resolve(__dirname, 'kz/raspolozhenie-prodavcov-kaspi.html'),
        kz_kachestvo_magazina_kaspi: resolve(__dirname, 'kz/kachestvo-magazina-kaspi.html'),
        otlichnyj_prodavec_kaspi: resolve(__dirname, 'otlichnyj-prodavec-kaspi.html'),
        kz_otlichnyj_prodavec_kaspi: resolve(__dirname, 'kz/otlichnyj-prodavec-kaspi.html'),
        kz_kogda_kaspi_platit_prodavcu: resolve(__dirname, 'kz/kogda-kaspi-platit-prodavcu.html'),
        predzakaz_kaspi: resolve(__dirname, 'predzakaz-kaspi.html'),
        kz_predzakaz_kaspi: resolve(__dirname, 'kz/predzakaz-kaspi.html'),
        fiskalnyj_chek_kaspi: resolve(__dirname, 'fiskalnyj-chek-kaspi.html'),
        kz_fiskalnyj_chek_kaspi: resolve(__dirname, 'kz/fiskalnyj-chek-kaspi.html'),
        sroki_kaspi_dostavki: resolve(__dirname, 'sroki-kaspi-dostavki.html'),
        kz_sroki_kaspi_dostavki: resolve(__dirname, 'kz/sroki-kaspi-dostavki.html'),
        kz_stati: resolve(__dirname, 'kz/stati.html'),
        notfound: resolve(__dirname, '404.html')
      }
    }
  }
});
