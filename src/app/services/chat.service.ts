import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { GroupMessageService } from './group-message.service';
import { GroupMessage } from './../models/GroupMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io('http://localhost:3000');

  constructor(private groupMessageService: GroupMessageService) { }

  joinRoom(data) {
    this.socket.emit('join', data);
    console.log(data);
  }

  newUserJoined() {
    const observable = new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  sendMessage(data) {
    this.socket.emit('chat', data);
    const groupMessage = new GroupMessage();
    groupMessage.content = data.content;
    groupMessage.room = data.room;
    groupMessage.user = data.user;
    groupMessage.createdAt = data.createdAt;
    this.groupMessageService.createGroupMessage(groupMessage).subscribe(res => console.log(res));
  }

  newMessageReceived() {
    const observable = new Observable<GroupMessage>(observer => {
      this.socket.on('chat', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });

    return observable;
  }

  typing(data) {
    this.socket.emit('typing', data);
  }

  // typingReceived(){
  //     let observable = new Observable<{user:String, message:String}>(observer=>{
  //         this.socket.on('typing message', (data)=>{
  //             observer.next(data);
  //         });
  //         return () => {this.socket.disconnect();}
  //     });

  //     return observable;
  // }
}

