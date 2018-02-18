import * as shelljs from "shelljs";
import * as LambdaProxy from "../../interfaces/lambda-proxy";
const urlRegex = require("url-regex");

function getHttpCode(url: string): Promise<number> {
  return new Promise(resolve => {
    const httpCode: number = parseInt(shelljs.exec(`curl -s -o /dev/null -w "%{http_code}\n" ${url}`).stdout, 10);

    resolve(httpCode);
  });
}

function getHttpContent(url: string): Promise<string> {
  return new Promise(resolve => {
    const httpContent: string = shelljs.exec(`curl ${url}`).stdout;

    resolve(httpContent);
  });
}

function hasLinkTagCheck(content: string): boolean {
  let hasSpam = false;
  if (content.includes(`href=”link”`)) {
    hasSpam = true;
  }

  return hasSpam;
}

function hasSpamCheck(content: string, spamLinkDomains: string[]): boolean {
  let hasSpam = false;
  spamLinkDomains.forEach((spamLinkDomain: string) => {
    if (content.includes(spamLinkDomain)) {
      hasSpam = true;
      return hasSpam;
    }
  });

  return hasSpam;
}

function removeDuplicateUsingSet(arr: any[]) {
  let unique_array = Array.from(new Set(arr));
  return unique_array;
}

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
  const uniqueUrlArray = removeDuplicateUsingSet(urlArray);
  const spamLinkDomains = ["tvtv24.com", "www.filekok.com"];
  const redirectionDepth = 4;
  console.log(uniqueUrlArray);

  try {
    let anySpamLinkHasSpam: boolean;
    await Promise.all(
      uniqueUrlArray.map(async (url: string) => {
        let currentDepth = 0;
        let isRedirect;

        let thisUrlHasSpam;
        do {
          const httpCode = await getHttpCode(url);
          const httpContent = await getHttpContent(url);
          const httpContentHasLinkTag = hasLinkTagCheck(httpContent);
          if (httpCode === 301 || httpCode === 302 || httpContentHasLinkTag) {
            isRedirect = true;
          } else {
            thisUrlHasSpam = await hasSpamCheck(httpContent, spamLinkDomains);
            if (thisUrlHasSpam) break;
          }
          isRedirect = false;
          currentDepth++;
        } while (currentDepth <= redirectionDepth && isRedirect);
        if (thisUrlHasSpam) {
          anySpamLinkHasSpam = true;
          return;
        }
      }),
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
      },
      body: {
        isSpam: anySpamLinkHasSpam,
      },
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
