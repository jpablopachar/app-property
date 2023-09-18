import { Property } from "@app/models/server"

export interface PropertyState {
  properties: Property[] | null;
  property: Property | null;
  loading: boolean | null;
  error: string | null;
}