import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface SignUpCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

url = 'https://api.angular-email.com';
signedIn$ = new BehaviorSubject(null);
username = '';

  userNameAvailable(username: string) {
    return this.http.post<{ available: boolean }>(this.url + '/auth/username', {
            username
        })
  }

  constructor(private http: HttpClient) { }

  signUp(credentials: SignUpCredentials) {
    return this.http.post<{ username: string }>(this.url + '/auth/signup', credentials)
    .pipe(
      tap((response) => {
        this.signedIn$.next(true);
        this.username = response.username;
       })
    );
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(this.url + '/auth/signedin')
    .pipe(
      tap(({ authenticated, username }) => {
        this.signedIn$.next(authenticated);
        this.username = username;
      })
    )
  }

  signOut() {
    return this.http.post(this.url + '/auth/signout', {})
    .pipe(
      tap(() => {
        this.signedIn$.next(false);
      })
    )
  }

  signin(credentials: any) {
    return this.http.post<any>(this.url + '/auth/signin', credentials)
    .pipe(
      tap((response) => {
        this.signedIn$.next(true);
        this.username = response.username;
      })
    )
  }
}
