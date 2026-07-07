const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('State Management Bug Tests', function () {
    // Timeout diatur ke 30 detik untuk mengakomodasi jeda waktu (sleep) visual
    this.timeout(30000);

    let driver;

    // beforeEach: Membuka browser Edge
    beforeEach(async function () {
        driver = await new Builder().forBrowser('MicrosoftEdge').build();
        await driver.manage().window().maximize();
        await driver.get('https://www.saucedemo.com/');
    });

    // afterEach: Menutup browser Edge
    afterEach(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('Bug Cart Badge: Memvalidasi sinkronisasi angka keranjang saat barang ditambah dan dihapus', async function () {
        // 1. Login menggunakan akun problem_user
        await driver.findElement(By.id('user-name')).sendKeys('problem_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        // Menunggu halaman produk dimuat sepenuhnya
        await driver.wait(until.elementLocated(By.className('inventory_list')), 5000);
        await driver.sleep(1000); // Jeda visual 1 detik untuk video

        // 2. Klik tombol 'Add to cart' pada produk pertama (Backpack)
        let firstItemAddBtn = await driver.findElement(By.id('add-to-cart-sauce-labs-backpack'));
        await firstItemAddBtn.click();
        await driver.sleep(1000); // Jeda visual 1 detik

        // 3. Klik tombol 'Add to cart' pada produk kedua (Bike Light)
        let secondItemAddBtn = await driver.findElement(By.id('add-to-cart-sauce-labs-bike-light'));
        await secondItemAddBtn.click();
        await driver.sleep(1000); // Jeda visual 1 detik

        // 4. Validasi angka pada badge keranjang harus bernilai '2'
        let badgeElement = await driver.findElement(By.className('shopping_cart_badge'));
        let badgeText = await badgeElement.getText();

        // Assert pertama: Memastikan barang berhasil masuk (Biasanya lolos)
        assert.strictEqual(
            badgeText,
            '2',
            `Ekspektasi gagal: Diharapkan badge bernilai 2, tapi yang muncul adalah ${badgeText}`
        );

        // 5. Selanjutnya, klik tombol 'Remove' pada produk pertama untuk menghapusnya
        // Catatan: Pada produk pertama, tombol 'Add to cart' tadi sudah berubah ID-nya menjadi 'remove'
        let firstItemRemoveBtn = await driver.findElement(By.id('remove-sauce-labs-backpack'));
        await firstItemRemoveBtn.click();
        await driver.sleep(1500); // Jeda visual 1,5 detik agar terekam di video

        // 6. Mengambil ulang teks dari badge keranjang setelah penghapusan
        badgeElement = await driver.findElement(By.className('shopping_cart_badge'));
        let newBadgeText = await badgeElement.getText();

        // 7. Validasi (Assert) - TES INI DIHARAPKAN GAGAL KARENA BUG STATE MANAGEMENT
        assert.strictEqual(
            newBadgeText,
            '1',
            `BUG DETECTED: Sinkronisasi keranjang rusak! Diharapkan badge menjadi 1 setelah barang dihapus, tapi nyatanya angka tetap ${newBadgeText}`
        );
    });
});