import { ModuleWithProviders, NgModule } from '@angular/core'
import { AuthService } from './auth.service'

@NgModule({
  declarations: [],
  imports: []
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService],
    };
  }
}
