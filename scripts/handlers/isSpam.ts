import * as LambdaProxy from "../interfaces/lambda-proxy";
const axios = require("axios");

export default async function handler(event: LambdaProxy.Event, _context: LambdaProxy.Context) {
  // https://api.coinone.co.kr/oauth/access_token/?app_id=[App_Id]&app_secret=[App_Secret]&request_token=[Request token]
  /*
      *** body Fields
      requestToken: string;
      appId: string;
  */

  let paramsForGetAccessToken;
  try {
    paramsForGetAccessToken = JSON.parse(event.body);
  } catch (err) {
    paramsForGetAccessToken = event.body;
  }

  axios({
    method: "post",
    url: "https://api.coinone.co.kr/oauth/access_token",
    data: {
      app_id: paramsForGetAccessToken.appId,
      app_secret: process.env.COINONE_APP_SECRET_CODE,
      request_token: paramsForGetAccessToken.requestToken,
    },
  })
    .then((response: any) => {
      console.log("success response is ", response);
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: response.data.accessToken,
      };
    })
    .catch((err: any) => {
      console.error(err);
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    });
}
