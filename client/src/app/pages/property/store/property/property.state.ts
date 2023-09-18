import { Property } from "@app/models/server"

export interface PropertyGeneralState {
  properties: Property[] | null;
  property: Property | null;
  loading: boolean | null;
  error: string | null;
}