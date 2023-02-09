import { ModuleWithProviders, NgModule } from '@angular/core'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { NotificationService } from './notification.service'

@NgModule({
  imports: [MatSnackBarModule]
})
export class NotificationModule {
  static forRoot(): ModuleWithProviders<NotificationModule>{
    return  {
      ngModule: NotificationModule,
      providers: [NotificationService]
    };
  }
}