const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Error Handling & Validation Tests', function () {
    this.timeout(30000);

    let driver;

    beforeEach(async function () {
        driver = await new Builder().forBrowser('MicrosoftEdge').build();

        await driver.manage().window().maximize();
        await driver.get('https://www.saucedemo.com/');
    });

    afterEach(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('Login Akun Diblokir: Memvalidasi error saat login dengan akun locked_out_user', async function () {
        await driver.findElement(By.id('user-name')).sendKeys('locked_out_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');

        await driver.findElement(By.id('login-button')).click();

        let errorElement = await driver.wait(until.elementLocated(By.css('[data-test="error"]')), 5000);
        let errorText = await errorElement.getText();

        assert.strictEqual(errorText, 'Epic sadface: Sorry, this user has been locked out.');
    });

    it('Login Tanpa Password: Memvalidasi error saat password dibiarkan kosong', async function () {
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('login-button')).click();

        let errorElement = await driver.wait(until.elementLocated(By.css('[data-test="error"]')), 5000);
        let errorText = await errorElement.getText();

        assert.strictEqual(errorText, 'Epic sadface: Password is required');
    });

    it('Checkout First Name Kosong: Memvalidasi error saat nama depan tidak diisi', async function () {

        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        await driver.wait(until.elementLocated(By.id('add-to-cart-sauce-labs-backpack')), 5000).click();

        await driver.findElement(By.className('shopping_cart_link')).click();

        await driver.wait(until.elementLocated(By.id('checkout')), 5000).click();

        await driver.wait(until.elementLocated(By.id('last-name')), 5000).sendKeys('Testing');
        await driver.findElement(By.id('postal-code')).sendKeys('12345');

        await driver.findElement(By.id('continue')).click();

        let errorElement = await driver.wait(until.elementLocated(By.css('[data-test="error"]')), 5000);
        let errorText = await errorElement.getText();

        assert.strictEqual(errorText, 'Error: First Name is required');
    });
});