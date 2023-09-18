import { Property } from '@app/models/server'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { PropertyState } from '..'
import { PropertyGeneralState } from './property.state'

export const selectProperty = createFeatureSelector<PropertyState>('property');

export const selectGetPropertyState = createSelector(
  selectProperty,
  (state: PropertyState): PropertyGeneralState => state.list
);

export const selectLoading = createSelector(
  selectGetPropertyState,
  (state: PropertyGeneralState) => state.loading
);

export const selectGetProperties = createSelector(
  selectGetPropertyState,
  (state: PropertyGeneralState): Property[] | null => state.properties
);
