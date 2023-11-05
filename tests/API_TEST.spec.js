// @ts-check
const { test, expect } = require('@playwright/test');

const baseUrl = 'https://reqres.in/api'
test('POST USER Register', async ({ request }) => {
  const response = await request.post(baseUrl+'/register', {
    data: {
      "email": "eve.holt@reqres.in",
      "password": "pistol"
    }
  });

  const responseBody = await response.json();
  console.log('API response body:', responseBody);

  expect(response.status()).toBe(200)

  const expectedStructure = {
    id: expect.any(Number),  // Check if key1 is a string
    token: expect.any(String),
  };
  await expect(responseBody).toEqual(expectedStructure);
});

test('POST USER Login', async ({ request }) => {
  const response = await request.post(baseUrl+'/login', {
    data: {
      "email": "eve.holt@reqres.in",
      "password": "pistol"
    }
  });

  const responseBody = await response.json();
  // console.log(responseBody);
  expect(response.status()).toBe(200);
  const expectedStructure = {
    token: expect.any(String),
  };
  await expect(responseBody).toEqual(expectedStructure);
});

test('DELETE user request', async({request}) => {
  const response = await request.delete(baseUrl+`/delete/2`)
  expect(response.status()).toBe(204);
});


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
    }), // try using the function above to reuse the code
  };
});

test("Update User", async({request}) =>{

  const response = await request.put(baseUrl+'/update/2', {
    data: {
      name:"name",
      job: "tester",
      updatedAt: "2023-11-04T10:15:16.583Z"
    }
  });
  const responseBody = await response.json();
  console.log(responseBody);
})
