import { createFeatureSelector, createSelector } from '@ngrx/store'
import { PropertyState } from './property.state'

export const propertySelector = createFeatureSelector<PropertyState>('property');

export const getProperty = createSelector(
  propertySelector,
  (state: PropertyState) => state.property
);

export const getProperties = createSelector(
  propertySelector,
  (state: PropertyState) => state.properties
);

export const getLoading = createSelector(
  propertySelector,
  (state: PropertyState) => state.loading
);
