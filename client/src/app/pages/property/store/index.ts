import { PropertyEffects, propertyReducers } from "./property"

// export interface PropertyState1 { list: PropertyState }

export const reducers = { property: propertyReducers }

export const propertyEffects: (typeof PropertyEffects)[] = [PropertyEffects]
