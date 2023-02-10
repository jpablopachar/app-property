import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface DialogData {
  multiple: boolean;
  crop: boolean;
}

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss'],
})
export class FilesUploadComponent {
  public isHovering!: boolean;
  public imageFile!: File;
  public isError!: boolean;
  public files: File[];
  public filesURLs: string[];

  constructor(
    private readonly _dialogRef: MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.files = [];
    this.filesURLs = [];
  }

  public toggleHover(event: any): void {
    this.isHovering = event;
  }

  public onDrop(files: any): void {
    this._dropGeneral(files);
  }

  public onDropFile(event: FileList | any): void {
    this._dropGeneral(event.target.files);
  }

  private _dropGeneral(files: FileList): void {
    this.isError = false;

    if (this.data.crop && files.length > 1) {
      this.isError = true;

      return;
    }

    if (
      this.data.crop &&
      files.length === 1 &&
      files.item(0)?.type.split('/')[0] === 'image'
    ) {
      this.imageFile = files.item(0) as File;

      return;
    }

    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i) as File);
    }

    console.log(files);
  }

  public onUploadComplete(url: any): void {
    this.filesURLs.push(url);
  }

  public onComplete(): void {
    const res: string | string[] = this.data.multiple ? this.filesURLs : this.filesURLs[0];

    this._dialogRef.close(res);
  }

  public onClose(): void {
    this._dialogRef.close();
  }
}
