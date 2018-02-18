import { ACTION_TYPES } from "../../actions/actionTypes";
import { Dispatch } from "react-redux";
import { ISpamFilterCheckParams } from "../../api/spam";
import spamApi from "../../api/spam";
import removeDuplicateUsingSet from "../../helpers/removeDuplicateUsingSet";

export function changeContentInput(content: string) {
  return {
    type: ACTION_TYPES.SPAM_FILTER_CHANGE_CONTENT_INPUT,
    payload: {
      content,
    },
  };
}

export function changeSpamLinkDomain(spamLinkDomain: string, index: number) {
  return {
    type: ACTION_TYPES.SPAM_FILTER_CHANGE_SPAM_LINK_DOMAIN,
    payload: {
      spamLinkDomain,
      index,
    },
  };
}

export function plusSpamLinkDomain() {
  return {
    type: ACTION_TYPES.SPAM_FILTER_PLUS_SPAM_LINK_DOMAIN,
  };
}

export function minusSpamLinkDomain() {
  return {
    type: ACTION_TYPES.SPAM_FILTER_MINUS_SPAM_LINK_DOMAIN,
  };
}

export function plusRedirectionDepth() {
  return {
    type: ACTION_TYPES.SPAM_FILTER_PLUS_REDIRECTION_DEPTH,
  };
}

export function minusRedirectionDepth() {
  return {
    type: ACTION_TYPES.SPAM_FILTER_MINUS_REDIRECTION_DEPTH,
  };
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

function getHttpCode(_url: string): Promise<number> {
  return new Promise(resolve => {
    resolve(301);
  });
}

function getHttpContent(_url: string): Promise<string> {
  return new Promise(resolve => {
    resolve("fsdkfjdskljfdslkfd");
  });
}

export async function testSpamFilter() {
  return new Promise((resolve, _reject) => {
    // var http = require('follow-redirects').http;
    // var followRedirects = require('follow-redirects');

    // var options = url.parse('http://bit.ly/900913');
    // options.maxRedirects = 10;
    // http.request(options);

    const urlRegex = require("url-regex");
    const testUrl = "https://goo.gl/nVLutc";
    const testContent = `dsfjkfdlsjdfksl sdkljfkdlsjfds ${testUrl} ${testUrl}dsdsds ${testUrl}`;
    const urlArray = testContent.match(urlRegex());
    const uniqueUrlArray = removeDuplicateUsingSet(urlArray);
    const spamLinkDomains = ["tvtv24.com", "www.filekok.com"];
    const redirectionDepth = 4;

    let hasSpam: boolean;
    uniqueUrlArray.forEach(async (url: string) => {
      let currentDepth = 0;
      let isRedirect;

      do {
        const httpCode = await getHttpCode(url);
        const httpContent = await getHttpContent(url);
        const httpContentHasLinkTag = hasLinkTagCheck(httpContent);
        if (httpCode === 301 || httpCode === 302 || httpContentHasLinkTag) {
          isRedirect = true;
        } else {
          hasSpam = await hasSpamCheck(httpContent, spamLinkDomains);
          if (hasSpam) break;
        }
        isRedirect = false;
        currentDepth++;
      } while (currentDepth <= redirectionDepth && isRedirect);

      if (hasSpam) return;
    });

    const request = require("request");

    request(
      // "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
      {
        method: "get",
        url: testUrl,
        withCredentials: true,
        followAllRedirects: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        // mode: "no-cors",
      },
      (err: any, _res: any, body: any) => {
        if (err) {
          console.log(err);
        }
        console.log(body.url);
        console.log(body.explanation);
        resolve();
      },
    );
  });
}

export function spamFilterCheck({
  content,
  spamLinkDomains,
  redirectionDepth,
  cancelTokenSource,
}: ISpamFilterCheckParams) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.SPAM_FILTER_START_TO_SPAM_FILTER_CHECK,
    });

    try {
      const isSpam = await spamApi.isSpam({ content, spamLinkDomains, redirectionDepth, cancelTokenSource });

      dispatch({
        type: ACTION_TYPES.SPAM_FILTER_SUCCEEDED_TO_SPAM_FILTER_CHECK,
        payload: {
          isSpam,
        },
      });
    } catch (err) {
      alert(err);
      dispatch({
        type: ACTION_TYPES.SPAM_FILTER_FAILED_TO_SPAM_FILTER_CHECK,
      });
    }
  };
}
