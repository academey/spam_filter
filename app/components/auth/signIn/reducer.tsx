import { IReduxAction } from "../../../typings/actionType";
import { SIGN_IN_INITIAL_STATE, ISignInStateRecord } from "./records";
import { ACTION_TYPES } from "../../../actions/actionTypes";

export function reducer(state = SIGN_IN_INITIAL_STATE, action: IReduxAction<any>): ISignInStateRecord {
  switch (action.type) {
    case ACTION_TYPES.SIGN_IN_CHANGE_EMAIL_INPUT: {
      return state.set("email", action.payload.email);
    }

    case ACTION_TYPES.SIGN_IN_CHANGE_PASSWORD_INPUT: {
      return state.set("password", action.payload.password);
    }

    default:
      return state;
  }
}
