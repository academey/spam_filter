import { TypedRecord, makeTypedFactory } from "typed-immutable-record";
import { List } from "immutable";

export interface ISpamFilterState {
  isLoading: boolean;
  hasError: boolean;
  content: string;
  spamLinkDomains: List<string>;
  redirectionDepth: number;
}

export interface ISpamFilterStateRecord extends TypedRecord<ISpamFilterStateRecord>, ISpamFilterState {}

const initialSpamFilterState: ISpamFilterState = {
  isLoading: false,
  hasError: false,
  content: "",
  spamLinkDomains: List(),
  redirectionDepth: null,
};

export const SpamFilterStateFactory = makeTypedFactory<ISpamFilterState, ISpamFilterStateRecord>(
  initialSpamFilterState,
);

export const SPAM_FILTER_INITIAL_STATE = SpamFilterStateFactory();
