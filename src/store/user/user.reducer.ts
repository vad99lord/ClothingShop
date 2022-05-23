import { AnyAction } from "redux";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
} from "./user.actions";
import { User } from "./user.types";

type MutableUserState = {
  currentUser: User | null;
  isLoading: boolean;
  error: Error | null;
};

export type UserState = Readonly<MutableUserState>;

export const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = USER_INITIAL_STATE,
  action = {} as AnyAction
): UserState => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  if (
    signOutFailed.match(action) ||
    signInFailed.match(action) ||
    signUpFailed.match(action)
  ) {
    return { ...state, error: action.payload };
  }
  return state;
};
