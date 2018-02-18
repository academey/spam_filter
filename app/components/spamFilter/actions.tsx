import { ACTION_TYPES } from "../../actions/actionTypes";
import { Dispatch } from "react-redux";
import { ISpamFilterCheckParams } from "../../api/spam";
import spamApi from "../../api/spam";

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

export function spamFilterCheck({
  content,
  spamLinkDomains,
  redirectionDepth,
  cancelTokenSource,
}: ISpamFilterCheckParams) {
  return async (dispatch: Dispatch<any>) => {
    let isContentTooShort = false;
    if (content.length < 2) {
      isContentTooShort = true;
      alert("isContentTooShort");
    }

    let isSpamLinkDomainTooShort = false;
    spamLinkDomains.forEach((spamLinkDomain: string) => {
      if (spamLinkDomain.length < 2) {
        isSpamLinkDomainTooShort = true;
        alert("isSpamLinkDomainTooShort");
        return;
      }
    });

    let isRedirectionDepthTooSmall = false;
    if (redirectionDepth < 1) {
      isRedirectionDepthTooSmall = true;
      alert("isRedirectionDepthTooSmall");
    }

    if (isContentTooShort || isSpamLinkDomainTooShort || isRedirectionDepthTooSmall) {
      return;
    }

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
