import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { map, tap, catchError, shareReplay } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private BASE_URL: string = "http://localhost:3000/api/auth";

  constructor(private http: HttpClient) { }

  login(email:string, password:string ) {
    return this.http.post<any>(`${this.BASE_URL}/login`, {email, password}).pipe(
      tap((res) => {this.setSession(res)})
    );
  }
      
  private setSession(authResult) {
    // const expiresAt = moment().add(authResult.expiresIn,'second');
    // console.log(authResult.user);
    
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('currentUser', JSON.stringify(authResult.user));
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  getSession(data): string{
    try {
      let user: Object;  
      switch (data) {
        case "token":
          return localStorage.getItem('id_token');
          break;
        case "currentUser":
          let objJson = localStorage.getItem('currentUser');
          objJson = JSON.parse(objJson);
          return objJson;
          break;
        default:
          return "Error in session";
          break;
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  }
  
  // getSession(data): string{
  //   try {
  //     switch (data) {
  //       case "token":
  //         return localStorage.getItem('id_token');
  //         break;
  //       case "userId":
  //         return localStorage.getItem('userId');
  //         break;
  //       case "username":
  //         return localStorage.getItem('currentUser');
  //         break;
  //       default:
  //         return "Error in session";
  //         break;
  //     }
  //   } catch (error) {
  //     console.log("Error: " + error);
  //   }
  // }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("currentUser");
  }

  register(user: User): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, user, httpOptions).pipe(
      tap((user: User) => console.log('Usuário registrado: ' + user)),
      catchError(this.handleError<User>('register'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
