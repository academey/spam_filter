import { IReduxAction } from "../../typings/actionType";
import { ACTION_TYPES } from "../../actions/actionTypes";
import { SPAM_FILTER_INITIAL_STATE, ISpamFilterStateRecord } from "./records";

export function reducer(state = SPAM_FILTER_INITIAL_STATE, action: IReduxAction<any>): ISpamFilterStateRecord {
  switch (action.type) {
    case ACTION_TYPES.SPAM_FILTER_CHANGE_CONTENT_INPUT: {
      return state.set("content", action.payload.content);
    }

    case ACTION_TYPES.SPAM_FILTER_CHANGE_SPAM_LINK_DOMAIN: {
      return state.withMutations(currentState => {
        return currentState.setIn(["spamLinkDomains", action.payload.index], action.payload.spamLinkDomain);
      });
    }

    case ACTION_TYPES.SPAM_FILTER_PLUS_SPAM_LINK_DOMAIN: {
      const pushedSpamLinkDomains = state.spamLinkDomains.push("");

      return state.set("spamLinkDomains", pushedSpamLinkDomains);
    }

    case ACTION_TYPES.SPAM_FILTER_MINUS_SPAM_LINK_DOMAIN: {
      const poppedSpamLinkDomains = state.spamLinkDomains.pop();

      return state.set("spamLinkDomains", poppedSpamLinkDomains);
    }

    case ACTION_TYPES.SPAM_FILTER_PLUS_REDIRECTION_DEPTH: {
      const currentRedirectionDepth = state.redirectionDepth;

      return state.set("redirectionDepth", currentRedirectionDepth + 1);
    }

    case ACTION_TYPES.SPAM_FILTER_MINUS_REDIRECTION_DEPTH: {
      const currentRedirectionDepth = state.redirectionDepth;

      return state.set("redirectionDepth", currentRedirectionDepth - 1);
    }

    case ACTION_TYPES.SPAM_FILTER_START_TO_SPAM_FILTER_CHECK: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", true).set("hasError", false);
      });
    }

    case ACTION_TYPES.SPAM_FILTER_SUCCEEDED_TO_SPAM_FILTER_CHECK: {
      return state.withMutations(currentState => {
        return currentState
          .set("isLoading", false)
          .set("hasError", false)
          .set("isSpam", action.payload.isSpam);
      });
    }

    case ACTION_TYPES.SPAM_FILTER_FAILED_TO_SPAM_FILTER_CHECK: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", false).set("hasError", true);
      });
    }
    default:
      return state;
  }
}
