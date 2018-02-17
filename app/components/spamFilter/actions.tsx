import { ACTION_TYPES } from "../../actions/actionTypes";
import { Dispatch } from "react-redux";
import { ISpamFilterCheckParams } from "../../api/spam";
import spamApi from "../../api/spam";
// import axios from "axios";

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

export async function testSpamFilter() {
  return new Promise((resolve, _reject) => {
    const testUrl = "https://goo.gl/nVLutc";
    // const testContent = `dsfjkfdlsjdfksl sdkljfkdlsjfds ${testUrl} ${testUrl}`;
    // let urlArray = [];
    // let currentIndex = 0;
    // while(currentIndex !== -1) {
    //   testContent.search("https://")
    // }

    // testContent.search()
    // const https = require("https");
    // https.get(testUrl, (res: any) => {
    //   console.log(res);
    // });

    const request = require("request");
    request(
      // "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
      {
        url: testUrl,
        followAllRedirects: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        mode: "no-cors",
      },
      (err: any, _res: any, body: any) => {
        if (err) {
          return console.log(err);
        }
        console.log(body.url);
        console.log(body.explanation);
        resolve();
      },
    );
    //   request(
    //     {
    //       url: testUrl,
    //       // mode: "no-cors",
    //       headers: {
    //         // { mode: 'no-cors' }
    //         // mode: "no-cors",
    //         // "Access-Control-Allow-Origin": "*",
    //         // "Access-Control-Allow-Credentials": true,
    //       },
    //     },
    //     (error: any, response: any, body: any) => {
    //       console.log("error:", error); // Print the error if one occurred
    //       console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    //       console.log("body:", body); // Print the HTML for the Google homepage.
    //       resolve();
    //     },
    //   );
  }).catch(err => {
    console.error(err);
  });

  // var https = require("follow-redirects").https;
  // https
  //   .get("https://goo.gl/nVLutc ", function(response: any) {
  //     response.on("data", function(chunk: any) {
  //       console.log(chunk);
  //     });
  //   })
  //   .on("error", function(err: any) {
  //     console.error(err);
  //   });

  // axios
  //   .get(testUrl, {
  //     // method: "head",
  //     url: testUrl,
  //     // withCredentials: true,
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD",
  //       "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  //       "Access-Control-Allow-Credentials": true,
  //       // "Content-Type": "text/plain;charset=utf-8",
  //     },
  //   })
  //   .then((response: any) => {
  //     console.log("success response is ", response);
  //   })
  //   .catch((err: any) => {
  //     console.error(err);
  //   });

  // axios({
  //   method: "head",
  //   url: testUrl,
  //   withCredentials: false,
  // })
  //   .then((response: any) => {
  //     console.log("success response is ", response);
  //   })
  //   .catch((err: any) => {
  //     console.error(err);
  //   });

  // axios({
  //   method: "request",
  //   url: testUrl,
  //   withCredentials: false,
  // })
  //   .then((response: any) => {
  //     console.log("success response is ", response);
  //   })
  //   .catch((err: any) => {
  //     console.error(err);
  //   });
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
