const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Performance & Timeout Tests', function () {
    let driver;

    // beforeEach: Dijalankan sebelum blok 'it' untuk menyiapkan browser
    beforeEach(async function () {
        // Karena proses membuka browser terkadang butuh waktu, 
        // kita beri waktu longgar khusus untuk proses setup ini
        this.timeout(10000);
        driver = await new Builder().forBrowser('MicrosoftEdge').build();
        await driver.manage().window().maximize();
        await driver.get('https://www.saucedemo.com/');
    });

    // afterEach: Menutup browser setelah pengujian selesai (atau gagal)
    afterEach(async function () {
        this.timeout(10000);
        if (driver) {
            await driver.quit();
        }
    });

    it('Timeout Detection: Memvalidasi performa login dengan batas waktu 3 detik', async function () {
        // PERHATIAN: Mengatur batas waktu (timeout) spesifik HANYA untuk skenario ini sebesar 3000 ms (3 detik)
        this.timeout(3000);

        // 1. Mengisi form login menggunakan akun yang memiliki masalah performa (lag)
        await driver.findElement(By.id('user-name')).sendKeys('performance_glitch_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');

        // 2. Klik tombol login
        // Catatan: Server SauceDemo akan menahan respons klik ini selama kurang lebih 5 detik
        await driver.findElement(By.id('login-button')).click();

        // 3. Memvalidasi bahwa halaman selanjutnya (inventory) berhasil dimuat
        // KODE DI BAWAH INI TIDAK AKAN PERNAH TERCAPAI.
        // Mocha akan menghentikan paksa tes secara otomatis tepat di detik ke-3 
        // dan mencetak status GAGAL (Timeout Error).
        let titleElement = await driver.wait(until.elementLocated(By.className('title')), 5000);
        let titleText = await titleElement.getText();

        assert.strictEqual(titleText, 'Products');
    });
});