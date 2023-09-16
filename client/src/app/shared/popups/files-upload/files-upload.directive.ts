import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject
} from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { FilesUploadComponent } from './files-upload.component'

@Directive({
  selector: '[appFilesUpload]',
  standalone: true,
  providers: [
    // importProvidersFrom(MatDialogModule)
  ],
  /* providers: [
    Dialog,
    MatDialog,
    {
      provide: MAT_DIALOG_SCROLL_STRATEGY,
      useFactory: (overlay: Overlay) => () => overlay.scrollStrategies.block(),
      deps: [Overlay],
    },
  ], */
})
export class FilesUploadDirective {
  @Input() multiple!: boolean;
  @Input() crop!: boolean;

  @Output() changed: EventEmitter<string | string[]>;

  private _dialog: MatDialog = inject(MatDialog);

  constructor() {
    this.changed = new EventEmitter<string | string[]>();
  }

  @HostListener('click', ['event']) onClick(): void {
    this.openDialog();
  }

  private openDialog(): void {
    const dialogRef: MatDialogRef<FilesUploadComponent, any> =
      this._dialog.open(FilesUploadComponent, {
        width: '550px',
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
