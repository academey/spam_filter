import * as LambdaProxy from "../interfaces/lambda-proxy";
const curl = require("curl");

export default async function handler(event: LambdaProxy.Event, _context: LambdaProxy.Context) {
  /*
      *** body Fields
      content: string;
      spamLinkDomains: string[];
      redirectionDepth: number;
  */

  let paramsForIsSpam;
  try {
    paramsForIsSpam = JSON.parse(event.body);
  } catch (err) {
    paramsForIsSpam = event.body;
  }
  console.log(paramsForIsSpam);
  // const content = paramsForIsSpam.content;
  // const spamLinkDomains = paramsForIsSpam.spamLinkDomains;
  // const redirectionDepth = paramsForIsSpam.redirectionDepth;

  const testUrl = "https://goo.gl/nVLutc";
  new Promise((resolve, _reject) => {
    curl.get(testUrl, {}, function(err: any, response: any, body: any) {
      // if(err){
      //   _reject();
      // }
      console.log(err);
      console.log(response);
      console.log(body);
      resolve();
    });
  })
    .then((response: any) => {
      console.log("success response is ", response);
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: response.data.accessToken
      };
    })
    .catch((err: any) => {
      console.error(err);
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        }
      };
    });
}
