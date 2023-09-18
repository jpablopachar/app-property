import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Property } from '@app/models/server'
import { Observable } from 'rxjs'
import { environment } from '../../../../environments/environment'
import { PropertyCreateRequest } from '../store/property/property.models'
import { PropertyUrl } from './property.urls'

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private _http: HttpClient;
  private _url: string;

  constructor() {
    this._http = inject(HttpClient);
    this._url = environment.url;
  }

  public getProperties(): Observable<Property[]> {
    return this._http.get<Property[]>(`${this._url}${PropertyUrl.GET_PROPERTY}`);
  }

  public getProperty(body: PropertyCreateRequest): Observable<Property> {
    return this._http.post<Property>(
      `${this._url}${PropertyUrl.GET_PROPERTY}`,
      body
    );
  }
}
