import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  WritableSignal,
  inject,
  signal
} from '@angular/core'
import {
  Storage,
  StorageReference,
  UploadTask,
  UploadTaskSnapshot,
  percentage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage'
import { Observable } from 'rxjs'
import { FileSizePipe } from '../../pipes'

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FileSizePipe],
  templateUrl: './upload.component.html',
  styles: [
    `
      @import 'src/styles/colors';

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
  public percentage$!: Observable<{
    progress: number;
    snapshot: UploadTaskSnapshot;
  }>;
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
    this.percentage$ = percentage(this.task());

    this.task().then((res: UploadTaskSnapshot): void => {
      console.log(res);

      this.snapshot = signal(res);
      this.downloadURL = signal(res.ref.fullPath);
    });
  }
}
