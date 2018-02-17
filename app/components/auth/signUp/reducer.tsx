import { IReduxAction } from "../../../typings/actionType";
import { SIGN_UP_INITIAL_STATE, ISignUpStateRecord } from "./records";
import { ACTION_TYPES } from "../../../actions/actionTypes";

export function reducer(state = SIGN_UP_INITIAL_STATE, action: IReduxAction<any>): ISignUpStateRecord {
  switch (action.type) {
    case ACTION_TYPES.SIGN_UP_CHANGE_EMAIL_INPUT: {
      return state.set("email", action.payload.email);
    }

    case ACTION_TYPES.SIGN_UP_CHANGE_PASSWORD_INPUT: {
      return state.set("password", action.payload.password);
    }

    case ACTION_TYPES.SIGN_UP_CHANGE_REPEAT_PASSWORD_INPUT: {
      return state.set("repeatPassword", action.payload.repeatPassword);
    }

    default:
      return state;
  }
}
