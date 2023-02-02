import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AngularFireUploadTask } from '@angular/fire/compat/storage'
import { UploadTaskSnapshot } from '@angular/fire/storage'
import { Observable } from 'rxjs'
import { FileSizePipe } from '../../pipes'

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FileSizePipe],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  @Input() file!: File;

  @Output() completed: EventEmitter<File>;

  public task !: AngularFireUploadTask;
  public snapshot$ !: Observable<UploadTaskSnapshot | undefined>;
  public percentage$ !: Observable<number | undefined>;
  public downloadURL !: string;

  constructor() {
    this.completed = new EventEmitter();
  }
}
