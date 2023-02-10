import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/compat/storage'
import { UploadTaskSnapshot } from '@angular/fire/storage'
import { lastValueFrom, Observable, Subject } from 'rxjs'
import { finalize, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input() file!: File;

  @Output() completed: EventEmitter<File>;

  private _destroy: Subject<void>;

  public task!: AngularFireUploadTask;
  public snapshot$!: Observable<UploadTaskSnapshot | undefined>;
  public percentage$!: Observable<number | undefined>;
  public downloadURL!: File;

  constructor(private readonly _afs: AngularFireStorage) {
    this.completed = new EventEmitter();
    this._destroy = new Subject();
  }

  ngOnInit(): void {
    this._startUpload();
  }

  private _startUpload(): void {
    const path = `${this.file.type.split('/')[0]}/${Date.now()}_${
      this.file.name
    }`;

    const storageRef: AngularFireStorageReference = this._afs.ref(path);

    this.task = this._afs.upload(path, this.file);
    this.percentage$ = this.task.percentageChanges();
    this.snapshot$ = this.task.snapshotChanges() as Observable<
      UploadTaskSnapshot | undefined
    >;

    this.snapshot$
      .pipe(
        takeUntil(this._destroy),
        finalize(async (): Promise<void> => {
          const storageRefObservable$: Observable<any> = storageRef.getDownloadURL();

          this.downloadURL = await lastValueFrom(storageRefObservable$);
          this.completed.next(this.downloadURL);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
