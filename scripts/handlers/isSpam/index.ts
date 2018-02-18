import * as shelljs from "shelljs";
import * as LambdaProxy from "../../interfaces/lambda-proxy";
const urlRegex = require("url-regex");

// function getHttpCode(url: string): Promise<number> {
//   return new Promise(resolve => {
//     const httpCode: number = parseInt(shelljs.exec(`curl -s -o /dev/null -w "%{http_code}\n" ${url}`).stdout, 10);

//     resolve(httpCode);
//   });
// }

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
  const testContent = `dsfjkfdlsjdfksl sdkljfkdlsjfds ${testUrl} ${testUrl}dsdsds ${testUrl}`;
  const urlArray = testContent.match(urlRegex());
  console.log(urlArray);

  // const uniqueUrlArray = removeDuplicateUsingSet(urlArray);
  // console.log(uniqueUrlArray);
  console.log(shelljs);
  // const testUrl = "https://goo.gl/nVLutc";
  // const httpCode = shelljs.exec(`curl -s -o /dev/null -w "%{http_code}\n" ${testUrl}`);
  // for (let i = 1; i < redirectionDepth; i++) {
  //   uniqueUrlArray.forEach(async (url: string) => {
  //     const httpCode = await getHttpCode(url);
  //     if(httpCode === 301 || httpCode === 302) {}
  //   });
  // }

  try {
    // const httpCode = await getHttpCode(testUrl);
    // console.log(httpCode);
    const isSpam = false;
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
      },
      body: `${isSpam}`,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
}

// export default async function handler(event: LambdaProxy.Event, _context: LambdaProxy.Context) {
//   /*
//       *** body Fields
//       content: string;
//       spamLinkDomains: string[];
//       redirectionDepth: number;
//   */

//   let paramsForIsSpam;
//   try {
//     paramsForIsSpam = JSON.parse(event.body);
//   } catch (err) {
//     paramsForIsSpam = event.body;
//   }
//   console.log(paramsForIsSpam);
//   // const content = paramsForIsSpam.content;
//   // const spamLinkDomains = paramsForIsSpam.spamLinkDomains;
//   // const redirectionDepth = paramsForIsSpam.redirectionDepth;
//   const urlRegex = require("url-regex");
//   const testUrl = "https://goo.gl/nVLutc";
//   const testContent = `dsfjkfdlsjdfksl sdkljfkdlsjfds ${testUrl} ${testUrl}dsdsds ${testUrl}`;
//   const urlArray = testContent.match(urlRegex());
//   const uniqueUrlArray = removeDuplicateUsingSet(urlArray);
//   console.log(shelljs);
//   // const testUrl = "https://goo.gl/nVLutc";
//   // const httpCode = shelljs.exec(`curl -s -o /dev/null -w "%{http_code}\n" ${testUrl}`);
//   for (let i = 1; i < redirectionDepth; i++) {
//     uniqueUrlArray.forEach((url:string)=>{
//       const httpCode = shelljs.exec(`curl -s -o /dev/null -w "%{http_code}\n" ${testUrl}`);
//     })
//   }
//   try {
//     // const httpCode = await getHttpCode(testUrl);

//     // console.log(httpCode);
//     const isSpam = false;
//     return {
//       statusCode: 200,
//       headers: {
//         "Content-Type": "text/html",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: `${isSpam}`,
//     };
//   } catch (err) {
//     console.log(err);
//     return {
//       statusCode: 500,
//       headers: {
//         "Content-Type": "text/html",
//         "Access-Control-Allow-Origin": "*",
//       },
//     };
//   }
// }
