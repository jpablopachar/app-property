import { Property } from "@app/models/backend"

export interface PropertyState {
  properties: Property[] | null;
  property: Property | null;
  loading: boolean | null;
  error: string | null;
}

export const initialState: PropertyState = {
  properties: null,
  property: null,
  loading: null,
  error: null
}