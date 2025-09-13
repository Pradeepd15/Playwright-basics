const { test,request, expect } = require('@playwright/test');
const { APIUtilFile } = require('../utils/APIUtilFile');

const userPayload = {userEmail: "pintuprajapati162@gmail.com", userPassword: "Pradeep@123"};
const orderPayload = {orders: [{country: "India", productOrderedId: "68a961459320a140fe1ca57a"}]};
const fakePayLoadOrders = { data: [], message: "No Orders" };

let token;
let apiUtils;
let response;
test.beforeAll(async()=>{
    const apiContext = await request.newContext();
    apiUtils = new APIUtilFile(userPayload,apiContext)
    token = await apiUtils.getToken();
   //response = await  apiUtils.createOrder(orderPayload)
})

// test("get token",async()=>{
//     console.log(`Token ${token}`)
// });

// test("create order",async()=>{
//    await  apiUtils.createOrder(orderPayload)
//     console.log("Order created")
// })

test("Mocking network call", async({page})=>{

    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    }, token);

    await page.goto("https://rahulshettyacademy.com/client")
    let body = JSON.stringify(fakePayLoadOrders);
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>{
            const response = await page.request.fetch(route.request())
            route.fulfill(
            { response,
                body
        })
        }
    )
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());
})