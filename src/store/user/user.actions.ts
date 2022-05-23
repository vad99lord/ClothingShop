import {
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { User, USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = withMatcher((user: User) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);

export const checkUserSession = withMatcher(() =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

export const googleSignInStart = withMatcher(() =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher(
  (email: string, password: string) =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {
      email,
      password,
    })
);

export const emailSignUpStart = withMatcher(
  (email: string, password: string, displayName: string) =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, {
      email,
      password,
      displayName,
    })
);

export const signOutStart = withMatcher(() =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

export const signInSuccess = withMatcher((user: User) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher((error: Error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);

export const signUpFailed = withMatcher((error: Error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
);

export const signOutFailed = withMatcher((error: Error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);

export const signOutSuccess = withMatcher(() =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);
