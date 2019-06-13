import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Message } from '../models/Message';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private BASE_URL: string = 'http://localhost:3000/api';
  private apiUrl = `${this.BASE_URL}/messages`;

  constructor(private http: HttpClient) { }

  createMessage(message): Observable<Message>{
    const url = `${this.apiUrl}/create`;
    return this.http.post<Message>(url, message, httpOptions).pipe(
      tap(message  => console.log('Mensagem criada...' + message)),
      catchError(this.handleError<Message>('createMessage'))
    );
  }

  getMessages(): Observable<Message[]>{
    return this.http.get<Message[]>(this.apiUrl).pipe(
      tap(messages => console.log('Retornou as mensagens ' + messages)),
      catchError(this.handleError('getMessages', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
