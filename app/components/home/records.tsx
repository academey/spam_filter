import { TypedRecord, makeTypedFactory } from "typed-immutable-record";

export interface IHomeState {
  isLoading: boolean;
  hasError: boolean;
}

export interface IHomeStateRecord extends TypedRecord<IHomeStateRecord>, IHomeState {}

const initialHomeState: IHomeState = {
  isLoading: false,
  hasError: false,
};

export const HomeStateFactory = makeTypedFactory<IHomeState, IHomeStateRecord>(initialHomeState);

export const HOME_INITIAL_STATE = HomeStateFactory();
