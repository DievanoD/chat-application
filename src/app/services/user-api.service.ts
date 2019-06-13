import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from '../models/User';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private BASE_URL: string = "http://localhost:3000/api";
  private apiUrl = `${this.BASE_URL}/users`;

  constructor(private http: HttpClient) { }

  getUser(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(user => console.log('Retornou os usuários ' + user)),
      catchError(this.handleError<User[]>('getUser', []))
    );    
  }

  getUserById(id: string): Observable<User>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(user => console.log("Buscou o " + user + "pelo id: " + id)),
      catchError(this.handleError<User>('getUserById'))
      );
  }

  // addUser(user): Observable<User> {
  //   const url = `${this.BASE_URL}/auth/register`;
  //   return this.http.post<User>(url, user, httpOptions).pipe(
  //     tap((user: User) => console.log('Usuário registrado: ' + user)),
  //     catchError(this.handleError<User>('addUser'))
  //   );
  // }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
