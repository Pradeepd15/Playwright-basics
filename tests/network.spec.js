const { test,request, expect } = require('@playwright/test');
const { APiUtils } = require('../utils/APIUtils');

const userPayload = {userEmail: "pintuprajapati162@gmail.com", userPassword: "Pradeep@123"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};

let response;
test.beforeAll(async()=>{

    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,userPayload)
    response = await apiUtils.createOrder(orderPayLoad);
})
let token; 
test("network intercept",async()=>{

    const apiContext = await request.newContext();
    const response = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        { data: userPayload }
    )

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    token = body.token;
    console.log(`token ${token}`)
});



