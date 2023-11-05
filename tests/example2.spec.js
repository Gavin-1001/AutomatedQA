const { test, expect, chromium, firefox} = require('@playwright/test');


const baseUrl = 'https://www.ek.co/'
const portalUrl = 'https://portal.ek.co/'
//const pageTitle = 'The people who power your possible'

test("Assert page title text", async () => {
    const browser = await firefox.launch();
    const page = await browser.newPage();

    await page.goto(baseUrl);
});

test("Assert Login button contains portal URL", async () => {

    const browser = await firefox.launch()
    const page = await browser.newPage();
    await page.goto(baseUrl);

    //get the title "THE PEOPLE WHO POWER YOUR POSSIBLE IS VISIBLE


    await page.getByRole("link", {name: "Log in"}).click()
    await expect(page).toHaveURL(new RegExp('^https://portal.ek.co/'));
    await page.getByRole("form").isVisible();
});

test("Form Errors", async() => {
    const emailErrorMsg = 'Email is required'
    const pwdErrorMsg = 'Password is required'
    const browser = await firefox.launch()
    const page = await browser.newPage();
    await page.goto(portalUrl);


    await page.getByRole("form").isVisible();

    await page.getByRole("button").click();
    await page.fill('#email', '')
    await page.fill('#passwd', '');

    await page.getByText(emailErrorMsg).isVisible();
    await page.getByText(pwdErrorMsg).isVisible();




});

test("Invalid email error", async() => {

    const invalidEmail = "gavin.test.com"
    const validEmail = "email@mail.com"


    const browser = await firefox.launch()
    const page = await browser.newPage();
    await page.goto(portalUrl);
    await page.getByRole("form").isVisible();
    await page.fill('#email', invalidEmail);
    await page.click('input[type="submit"]');
    await page.getByText("Email mist be a valid email").isVisible()

    await page.fill('#email', validEmail)
    await page.click('input[type="submit"]');
    await page.waitForSelector('#email-error',{state:"hidden"})
})
