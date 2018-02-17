import { TypedRecord, makeTypedFactory } from "typed-immutable-record";

export interface ISignUpState {
  isLoading: boolean;
  hasError: boolean;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface ISignUpStateRecord extends TypedRecord<ISignUpStateRecord>, ISignUpState {}

const initialSignUpState: ISignUpState = {
  isLoading: false,
  hasError: false,
  email: "",
  password: "",
  repeatPassword: ""
};

export const SignUpStateFactory = makeTypedFactory<ISignUpState, ISignUpStateRecord>(initialSignUpState);

export const SIGN_UP_INITIAL_STATE = SignUpStateFactory();
