import { UserEffects, userReducers } from "./user"

// export interface State { user: UserState }

export const reducers = { user: userReducers }

export const userEffects: (typeof UserEffects)[] = [UserEffects]