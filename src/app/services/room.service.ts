import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Room } from '../models/Room';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private BASE_URL = 'http://localhost:3000/api';
  private apiUrl = `${this.BASE_URL}/rooms`;

  constructor(private http: HttpClient) { }

  createRoom(room): Observable<Room> {
    const url = `${this.apiUrl}/create`;
    return this.http.post<Room>(url, room, httpOptions).pipe(
      tap( () => {console.log('Sala criada'); }),
      catchError(this.handleError<Room>('createRoom'))
    );
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl).pipe(
      tap(rooms => console.log('Retornou as salas ' + rooms)),
      catchError(this.handleError('getRooms', []))
    );
  }

  getRoomById(id): Observable<Room> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Room>(url).pipe(
      tap(room => console.log('Sala: ' + room.name)),
      catchError(this.handleError<Room>('getRoomById'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
