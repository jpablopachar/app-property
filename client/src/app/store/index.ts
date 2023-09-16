import { UserEffects, UserState, userReducers } from "./user"

export interface State { user: UserState }

export const reducers = { user: userReducers }

export const effects: (typeof UserEffects)[] = [UserEffects]