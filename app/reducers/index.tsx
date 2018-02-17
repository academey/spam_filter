import * as Redux from "redux";
import { routerReducer } from "react-router-redux";

import * as signUpReducer from "../components/auth/signUp/reducer";
import { SIGN_UP_INITIAL_STATE, ISignUpStateRecord } from "../components/auth/signUp/records";

import * as signInReducer from "../components/auth/signIn/reducer";
import { SIGN_IN_INITIAL_STATE, ISignInStateRecord } from "../components/auth/signIn/records";

import * as spamFilterReducer from "../components/spamFilter/reducer";
import { ISpamFilterStateRecord, SPAM_FILTER_INITIAL_STATE } from "../components/spamFilter/records";

export interface IAppState {
  routing?: any;
  signUp: ISignUpStateRecord;
  signIn: ISignInStateRecord;
  spamFilter: ISpamFilterStateRecord;
}

export const initialState: IAppState = {
  signUp: SIGN_UP_INITIAL_STATE,
  signIn: SIGN_IN_INITIAL_STATE,
  spamFilter: SPAM_FILTER_INITIAL_STATE,
};

export const rootReducer = Redux.combineReducers<IAppState>({
  routing: routerReducer,
  signUp: signUpReducer.reducer,
  signIn: signInReducer.reducer,
  spamFilter: spamFilterReducer.reducer,
});
