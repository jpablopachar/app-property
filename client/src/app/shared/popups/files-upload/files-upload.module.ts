import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatDialogModule } from '@angular/material/dialog'
import { UploadComponent } from './components/upload/upload.component'
import { DropZoneDirective } from './directives/drop-zone/drop-zone.directive'
import { FilesUploadDirective } from './directives/files-upload/files-upload.directive'
import { FilesUploadComponent } from './files-upload.component'
import { FileSizePipe } from './pipes/file-size/file-size.pipe'

@NgModule({
  declarations: [
    FilesUploadDirective,
    DropZoneDirective,
    FileSizePipe,
    FilesUploadComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    FilesUploadDirective
  ]
})
export class FilesUploadModule { }