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

function checkContentHasLinkTag(content: string): boolean {
  let hasLinkTag = false;

  if (content.search(/<a href/i) !== -1) {
    //// this should be replaced with more precise regex
    hasLinkTag = true;
  }

  return hasLinkTag;
}

function checkContentHasSpamLinkDomain(content: string, spamLinkDomains: string[]): boolean {
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
  const content = paramsForIsSpam.content;
  const spamLinkDomains = paramsForIsSpam.spamLinkDomains;
  const redirectionDepth = paramsForIsSpam.redirectionDepth;

  try {
    if (!content || !spamLinkDomains || !redirectionDepth) {
      throw new Error("Params are not satisfied. You have to put into content, spamLinkDomains, redirectionDepth");
    }

    const urlArray = content.match(urlRegex());
    const uniqueUrlArray = removeDuplicateUsingSet(urlArray);
    let anySpamLinkHasSpam: boolean;
    await Promise.all(
      uniqueUrlArray.map(async (url: string) => {
        let currentDepth = 0;
        let thisUrlWillRedirect;

        do {
          thisUrlWillRedirect = false;
          const httpCode = await getHttpCode(url);
          const httpContent = await getHttpContent(url);
          const httpContentHasLinkTag = checkContentHasLinkTag(httpContent);
          const httpHasError = httpCode.toString()[0] !== "2" && httpCode.toString()[0] !== "3";
          const httpRedirected = httpCode === 301 || httpCode === 302 || httpContentHasLinkTag;
          const thisUrlHasSpam = checkContentHasSpamLinkDomain(httpContent, spamLinkDomains);

          if (thisUrlHasSpam) {
            anySpamLinkHasSpam = true;
            break;
          } else if (httpHasError) {
            return;
          } else if (httpRedirected) {
            thisUrlWillRedirect = true;
          }
          currentDepth++;
        } while (currentDepth <= redirectionDepth && thisUrlWillRedirect && !anySpamLinkHasSpam);
      }),
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
      },
      body: anySpamLinkHasSpam,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
      },
      body: err,
    };
  }
}
