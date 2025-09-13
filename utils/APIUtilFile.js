const { request } = require('@playwright/test')

class APIUtilFile{

    constructor(userPayload, apiContext ){
        this.userPayload = userPayload;
        this.apiContext = apiContext;
    }

  async getToken(){
    const response = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        { data: this.userPayload }
    );
    const body = await response.json();
    return body.token;
  }

  async createOrder(orderPayload){

     const token = await this.getToken()
    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                "authorization": token,
                "content-type": "application/json"
            }
        }
    )

    const response = await orderResponse.json()
    console.log("productid",response.productOrderId)
}
}

module.exports = { APIUtilFile }