import { IReduxAction } from "../../typings/actionType";
import { ACTION_TYPES } from "../../actions/actionTypes";
import { SPAM_FILTER_INITIAL_STATE, ISpamFilterStateRecord } from "./records";

export function reducer(state = SPAM_FILTER_INITIAL_STATE, action: IReduxAction<any>): ISpamFilterStateRecord {
  switch (action.type) {
    case ACTION_TYPES.SPAM_FILTER_CHANGE_CONTENT_INPUT: {
      return state.set("content", action.payload.content);
    }

    case ACTION_TYPES.SPAM_FILTER_PLUS_REDIRECTION_DEPTH: {
      const currentRedirectionDepth = state.redirectionDepth;

      return state.set("redirectionDepth", currentRedirectionDepth + 1);
    }

    case ACTION_TYPES.SPAM_FILTER_MINUS_REDIRECTION_DEPTH: {
      const currentRedirectionDepth = state.redirectionDepth;

      return state.set("redirectionDepth", currentRedirectionDepth - 1);
    }

    default:
      return state;
  }
}
