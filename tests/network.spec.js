const { test,request, expect } = require('@playwright/test');
const { APIUtilFile } = require('../utils/APIUtilFile');

const userPayload = {userEmail: "pintuprajapati162@gmail.com", userPassword: "Pradeep@123"};

let token;
test.beforeAll(async()=>{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtilFile(userPayload,apiContext)
    token = await apiUtils.getToken();
})

test("network intercept",async()=>{
    console.log(`Token ${token}`)
});



