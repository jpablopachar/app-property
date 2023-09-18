import { Property } from '@app/models/server'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { PropertyState } from './property.state'

export const selectProperty = createFeatureSelector<PropertyState>('property');

export const selectGetPropertyState = createSelector(
  selectProperty,
  (state: PropertyState): PropertyState => state
);

export const selectLoading = createSelector(
  selectProperty,
  (state: PropertyState) => state.loading
);

export const selectGetProperties = createSelector(
  selectProperty,
  (state: PropertyState): Property[] | null => state?.properties
);
