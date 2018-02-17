import { IReduxAction } from "../typings/actionType";
import { CURRENT_USER_INITIAL_STATE, ICurrentUserRecord } from "../models/currentUser";

export function reducer(state = CURRENT_USER_INITIAL_STATE, action: IReduxAction<any>): ICurrentUserRecord {
  switch (action.type) {
    default:
      return state;
  }
}
