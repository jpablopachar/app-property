import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { PropertyRoutingModule } from './property.routing'
import { effects, reducers } from './store'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    StoreModule.forFeature('property', reducers),
    EffectsModule.forFeature(effects),
  ]
})
export class PropertyModule { }