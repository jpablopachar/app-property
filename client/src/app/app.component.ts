import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore'
import { RouterOutlet } from '@angular/router'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private _firestore: Firestore = inject(Firestore);

  public items$!: Observable<any[]>;

  ngOnInit(): void {
    const abc: CollectionReference<DocumentData> = collection(
      this._firestore,
      'test'
    );

    this.items$ = collectionData(abc);
  }
}
