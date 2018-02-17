import { IReduxAction } from "../../typings/actionType";
import { ACTION_TYPES } from "../../actions/actionTypes";
import { SPAM_FILTER_INITIAL_STATE, ISpamFilterStateRecord } from "./records";

export function reducer(state = SPAM_FILTER_INITIAL_STATE, action: IReduxAction<any>): ISpamFilterStateRecord {
  switch (action.type) {
    case ACTION_TYPES.GLOBAL_LOCATION_CHANGE: {
      return SPAM_FILTER_INITIAL_STATE;
    }

    default:
      return state;
  }
}
