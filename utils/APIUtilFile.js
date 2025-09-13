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
}

module.exports = { APIUtilFile }