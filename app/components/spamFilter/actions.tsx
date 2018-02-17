import { ACTION_TYPES } from "../../actions/actionTypes";
import { Dispatch } from "react-redux";
import { ISpamFilterCheckParams } from "../../api/spam";
import spamApi from "../../api/spam";
import axios from "axios";

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
  const testUrl = "https://goo.gl/nVLutc";
  axios
    .get(testUrl, {
      // method: "head",
      url: testUrl,
      // withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        "Access-Control-Allow-Credentials": true,
        // "Content-Type": "text/plain;charset=utf-8",
      },
    })
    .then((response: any) => {
      console.log("success response is ", response);
    })
    .catch((err: any) => {
      console.error(err);
    });

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
