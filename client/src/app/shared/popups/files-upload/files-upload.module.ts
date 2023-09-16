import { NgModule } from '@angular/core'
import { MatDialogModule } from '@angular/material/dialog'
import { FilesUploadDirective } from './files-upload.directive'

@NgModule({
  declarations: [FilesUploadDirective],
  imports: [MatDialogModule],
  exports: [FilesUploadDirective]
})
export class FilesUploadModule { }
