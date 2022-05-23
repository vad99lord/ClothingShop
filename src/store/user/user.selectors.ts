import { User } from "./user.types";

export const selectCurrentUser = (state: any): User => state.user.currentUser;
