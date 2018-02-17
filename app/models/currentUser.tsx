import { TypedRecord, recordify } from "typed-immutable-record";

export interface ICurrentUser {
  isLoggedIn: boolean;
  email: string | null;
  name: string | null;
  id: number | null;
}

export const initialCurrentUser: ICurrentUser = {
  isLoggedIn: false,
  email: null,
  name: null,
  id: null,
};

export interface ICurrentUserRecord extends TypedRecord<ICurrentUserRecord>, ICurrentUser {}

export function recordifyCurrentUser(currentUser: ICurrentUser = initialCurrentUser): ICurrentUserRecord {
  return recordify({
    isLoggedIn: currentUser.isLoggedIn,
    email: currentUser.email,
    name: currentUser.name,
    id: currentUser.id,
  });
}

export const CURRENT_USER_INITIAL_STATE: ICurrentUserRecord = recordifyCurrentUser(initialCurrentUser);
