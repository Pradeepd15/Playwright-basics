const { test,request, expect } = require('@playwright/test');
const { APIUtilFile } = require('../utils/APIUtilFile');

const userPayload = {userEmail: "pintuprajapati162@gmail.com", userPassword: "Pradeep@123"};

let token;
let apiUtils;
test.beforeAll(async()=>{
    const apiContext = await request.newContext();
    apiUtils = new APIUtilFile(userPayload,apiContext)
    token = await apiUtils.getToken();
   //response = await  apiUtils.createOrder(orderPayload)
})

test("Mocking network call", async({page})=>{

    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    }, token);

    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route=>
            await route.continue({ url : "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=68a961959320a140fe1ca57e"})
    
    )
    await page.locator("button:has-text('View')").first().click();

    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order")
    await page.pause();
})