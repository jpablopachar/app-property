import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  WritableSignal,
  inject,
  signal,
} from '@angular/core'
import {
  Storage,
  StorageReference,
  UploadTask,
  UploadTaskSnapshot,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage'
import { FileSizePipe } from '../../pipes'

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FileSizePipe],
  templateUrl: './upload.component.html',
  styles: [
    `
      @import 'src/styles/colors.scss';

      .upload {
        padding: 12px;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.05);
        margin-top: 12px;

        &__progress {
          width: 100%;
          &::-webkit-progress-value {
            transition: width 0.1s ease;
          }
        }

        &__info {
          display: flex;
          justify-content: space-between;
        }
      }

      .button {
        display: inline-block;
        margin: 2px 4px;
      }

      .app-a {
        margin-right: 0;
      }
    `,
  ],
})
export class UploadComponent implements OnInit {
  @Input() file!: File;

  @Output() completed: EventEmitter<string>;

  private _storage: Storage = inject(Storage);

  public task!: WritableSignal<UploadTask>;
  public snapshot!: WritableSignal<UploadTaskSnapshot>;
  public percentage!: WritableSignal<number>;
  public downloadURL!: WritableSignal<string>;

  constructor() {
    this.completed = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this._startUpload();
  }

  private _startUpload(): void {
    const url = `${this.file.type.split('/')[0]}/${Date.now()}_${
      this.file.name
    }`;

    const storageRef: StorageReference = ref(this._storage, url);

    this.task = signal(uploadBytesResumable(storageRef, this.file));

    this.task().then((res: UploadTaskSnapshot): void => {
      this.percentage = signal(res.bytesTransferred);
      this.snapshot = signal(res);
      this.downloadURL = signal(res.ref.fullPath);
    });
  }
}
