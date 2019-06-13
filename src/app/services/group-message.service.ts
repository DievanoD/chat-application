import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GroupMessage } from './../models/GroupMessage';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GroupMessageService {

  private BASE_URL = 'http://localhost:3000/api';
  private apiUrl = `${this.BASE_URL}/groupmessages`;

  constructor(private http: HttpClient) { }

  createGroupMessage(message): Observable<GroupMessage>{
    const url = `${this.apiUrl}/create`;
    return this.http.post<GroupMessage>(url, message, httpOptions).pipe(
      tap(message  => console.log('Mensagem criada na sala...' + message)),
      catchError(this.handleError<GroupMessage>('createGroupMessage'))
    );
  }

  getGroupMessages(id): Observable<GroupMessage[]>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<GroupMessage[]>(url).pipe(
      tap(messages => console.log('Retornou as mensagens da sala' + messages)),
      catchError(this.handleError('getGroupMessages', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
