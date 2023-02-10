import {
  Directive,
  EventEmitter,
  HostListener, Input,
  Output
} from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { FilesUploadComponent } from '../../files-upload.component'

@Directive({
  selector: '[appFilesUpload]'
})
export class FilesUploadDirective {
  @Input() multiple!: boolean;
  @Input() crop!: boolean;

  @Output() changed: EventEmitter<string | string[]>;

  constructor(private readonly _dialog: MatDialog) {
    this.changed = new EventEmitter();
  }

  @HostListener('click', ['event']) onClick(): void {
    this._openDialog();
  }

  private _openDialog(): void {
    const dialogRef: MatDialogRef<FilesUploadComponent, any> =
      this._dialog.open(FilesUploadComponent, {
        width: '500px',
        height: '500px',
        data: {
          multiple: this.multiple,
          crop: this.crop,
        },
      });

    dialogRef.afterClosed().subscribe((res: any): void => {
      this.changed.emit(res || null);
    });
  }
}
