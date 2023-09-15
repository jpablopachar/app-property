import { CommonModule } from '@angular/common'
import { Component, Inject, WritableSignal, signal } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { UploadComponent } from './components/upload'

export interface DialogData {
  multiple: boolean;
  crop: boolean;
}

@Component({
  selector: 'app-files-upload',
  standalone: true,
  imports: [CommonModule, UploadComponent],
  templateUrl: './files-upload.component.html',
  styles: [
    `
      @import 'src/styles/colors';

      .files-upload {
        display: flex;
        flex-direction: column;
        height: 100%;

        &__header {
          margin-bottom: 12px;
        }

        &__content {
          flex-grow: 1;
        }

        &__footer {
          display: inline-flex;
          flex-direction: row-reverse;
          margin-top: 12px;
        }
      }

      .dropzone {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 2px dashed $primary-light;
        border-radius: 4px;
        padding: 20px;

        &__hovered {
          border: 2px solid $primary;
          .dropzone__label,
          .dropzone__file {
            opacity: 0.3;
          }
        }
      }

      .file {
        &__input {
          display: none;
        }

        &__label {
          color: $primary;
          &:hover {
            color: $primary-dark;
            cursor: pointer;
          }
        }
      }
    `,
  ],
})
export class FilesUploadComponent {
  public files: WritableSignal<File[]>;
  public filesURLs: WritableSignal<string[]>;

  public imageFile!: WritableSignal<File>;
  public isError!: WritableSignal<boolean>;
  public isHovering!: WritableSignal<boolean>;

  constructor(
    private _dialogRef: MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.files = signal([]);
    this.filesURLs = signal([]);
  }

  public toggleHover(event: any): void {
    this.isHovering = signal(event);
    // this.isHovering = event;
  }

  public onDrop(files: any): void {
    this.dropGeneral(files);
  }

  public onDropFile(event: FileList | any): void {
    this.dropGeneral(event.target.files);
  }

  public dropGeneral(files: FileList): void {
    this.isError = signal(false);
    // this.isError = false;

    if (this.data.crop && files.length > 1) {
      this.isError.set(true);
      // this.isError = signal(true);
      // this.isError = true;
      return;
    }

    if (
      this.data.crop &&
      files.length === 1 &&
      files.item(0)?.type.split('/')[0] === 'image'
    ) {
      this.imageFile = signal(files.item(0) as File);
      // this.imageFile = files.item(0) as File;
      return;
    }

    for (let i = 0; i < files.length; i++) {
      this.files.mutate((values: File[]): number =>
        values.push(files.item(i) as File)
      );
      // this.files.push(files.item(i) as File);
    }

    // console.log(files);
  }

  onUploadComplete(url: string): void {
    this.filesURLs.mutate((values: string[]): number => values.push(url));
    // this.filesURLs.push(url);
  }

  onComplete(): void {
    const res: string | WritableSignal<string[]> = this.data.multiple
      ? this.filesURLs
      : this.filesURLs()[0];

    this._dialogRef.close(res);
  }

  onClose(): void {
    this._dialogRef.close();
  }
}
