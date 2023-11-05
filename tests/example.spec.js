// @ts-check
const { test, expect } = require('@playwright/test');

const baseUrl = 'https://reqres.in/api'
let expectBodyStructure;
test('POST register data', async ({ request }) => {
  const response = await request.post(baseUrl+'/register', {
    data: {
      "email": "eve.holt@reqres.in",
      "password": "pistol"
    }
  });

  const responseBody = await response.json();
  console.log('API response body:', responseBody);

  expect(response.status()).toBe(200)

  //todo-> this doesn't work correctly
  // const expectedStructure = {
  //   key1: expect.objectContaining({  // Check if key3 is an object
  //     subkey: expect.any(Number),
  //     : expect.any(String),
  //   }),
  // };
  //expect(responseBody).toEqual(expect.objectContaining(expectedStructure.key1));

});




test('POST user Login', async ({ request }) => {
  const response = await request.post(baseUrl+'/login', {
    data: {
      "email": "eve.holt@reqres.in",
      "password": "pistol"
    }
  });

  const responseBody = await response.json();
  // console.log(responseBody);
  expect(response.status()).toBe(200);
  //expectBodyStructure //take a look for response structure
});

test('DELETE user request', async({request}) => {
  const response = await request.delete(baseUrl+`/delete/2`)
  expect(response.status()).toBe(204);
});

/////
function expectBodyStructures(body) {
  // Define the expected structure
  const expectedStructure = {
    key1: expect.any(String),  // Check if key1 is a string
    key2: expect.any(Number),  // Check if key2 is a number
    key3: expect.objectContaining({  // Check if key3 is an object
      subkey1: expect.any(String),
      subkey2: expect.any(Boolean),
    }),
  };

  // Use the expect function to check if the body structure matches the expected structure
  return expect(body).toEqual(expect.objectContaining(expectedStructure));
}

////


test("GET - Single User", async({request}) => {
  const response = await request.get(baseUrl+`/users/2`)
  expect(response.status()).toBe(200)
  const responseBody = await response.json();
  console.log(responseBody)
  const expectedStructure = {
    id: expect.any(Number),  // Check if key1 is a string
    email: expect.any(String),
    first_name: expect.any(String),
    last_name: expect.any(String),
    avatar: expect.objectContaining({  // Check if key3 is an object
      url: expect.any(String),
      text: expect.any(String),
    }),
  };
});

test("PUT", async({request}) =>{

  const response = await request.put(baseUrl+``)

})





/*test('POST user Login', async ({ request }) => {
await page.goto('https://playwright.dev/');

// Click the get started link.
await page.getByRole('link', { name: 'Get started' }).click();

// Expects page to have a heading with the name of Installation.
await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});*/

