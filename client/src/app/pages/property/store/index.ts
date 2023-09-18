import { PropertyEffects, PropertyGeneralState, propertyReducers } from "./property"

export interface PropertyState { list: PropertyGeneralState }

export const reducers = { property: propertyReducers }

export const propertyEffects: (typeof PropertyEffects)[] = [PropertyEffects]
