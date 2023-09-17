import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { User } from '@app/models/server'
import { EmailPasswordCredentials, UserCreateRequest } from '@app/store/user'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { AuthUrl } from './auth.urls'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient;
  private _url: string;

  constructor() {
    this._http = inject(HttpClient);
    this._url = environment.url;
  }

  public signUp(body: UserCreateRequest): Observable<User> {
    return this._http.post<User>(`${this._url}${AuthUrl.SIGN_UP}`, body);
  }

  public signIn(body: EmailPasswordCredentials): Observable<User> {
    return this._http.post<User>(`${this._url}${AuthUrl.SIGN_IN}`, body);
  }

  public getUser(): Observable<User> {
    return this._http.get<User>(`${this._url}${AuthUrl.GET_USER}`);
  }
}
