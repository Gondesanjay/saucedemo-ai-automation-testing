const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Functional Bug Tests (Problem User)', function () {
    // Timeout diatur ke 30 detik
    this.timeout(30000);

    let driver;

    // beforeEach: Membuka browser Edge sebelum setiap skenario berjalan
    beforeEach(async function () {
        driver = await new Builder().forBrowser('MicrosoftEdge').build();
        await driver.manage().window().maximize();
        await driver.get('https://www.saucedemo.com/');
    });

    // afterEach: Menutup browser Edge setelah skenario selesai
    afterEach(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('Bug Broken Image: Memvalidasi gambar produk sesuai dengan namanya', async function () {
        // 1. Login menggunakan akun problem_user
        await driver.findElement(By.id('user-name')).sendKeys('problem_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        // 2. Menunggu halaman produk dimuat
        await driver.wait(until.elementLocated(By.id('item_4_img_link')), 5000);

        // 3. Mengambil elemen gambar dari produk pertama (Sauce Labs Backpack)
        // Kita menggunakan selector CSS untuk menargetkan tag <img> di dalam link produk tersebut
        let imageElement = await driver.findElement(By.css('#item_4_img_link img'));

        // 4. Mengambil nilai atribut 'src' (sumber URL file gambar)
        let imageSrc = await imageElement.getAttribute('src');

        // 5. Mengecek apakah kata 'backpack' ada di dalam nama file gambar tersebut
        let isImageCorrect = imageSrc.includes('backpack');

        // 6. Validasi (Assert) - TES INI DIHARAPKAN GAGAL KARENA MUNCUL GAMBAR ANJING
        assert.strictEqual(
            isImageCorrect,
            true,
            `BUG DETECTED: Gambar salah! Diharapkan URL mengandung 'backpack', tapi yang dimuat adalah: ${imageSrc}`
        );
    });

    it('Bug Sorting Rusak: Memvalidasi fitur urut harga termurah (Low to High)', async function () {
        // 1. Login menggunakan akun problem_user
        await driver.findElement(By.id('user-name')).sendKeys('problem_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        // 2. Menunggu dropdown filter muncul di layar
        let sortDropdown = await driver.wait(until.elementLocated(By.className('product_sort_container')), 5000);

        // 3. Mengklik dropdown filter tersebut
        await sortDropdown.click();

        // 4. Memilih opsi 'Price (low to high)' yang memiliki value HTML 'lohi'
        let lohiOption = await driver.findElement(By.css('option[value="lohi"]'));
        await lohiOption.click();

        // 5. Memberikan jeda waktu 1 detik agar sistem memproses pengurutan
        await driver.sleep(1000);

        // 6. Mengambil elemen harga dari produk PERTAMA yang muncul di layar setelah diurutkan
        let firstPriceElement = await driver.findElement(By.className('inventory_item_price'));
        let firstPriceText = await firstPriceElement.getText();

        // 7. Validasi (Assert) - TES INI DIHARAPKAN GAGAL KARENA SORTING RUSAK
        assert.strictEqual(
            firstPriceText,
            '$7.99',
            `BUG DETECTED: Fitur sorting gagal! Diharapkan harga termurah $7.99, tapi yang di urutan pertama adalah ${firstPriceText}`
        );
    });
});