import { User } from "@app/models/backend"

export interface UserState {
  entity: User | null;
  id: string | null;
  email: string | null;
  loading: boolean | null;
  error: string | null;
}

export const initialState: UserState = {
  entity: null,
  id: null,
  email: null,
  loading: null,
  error: null
}