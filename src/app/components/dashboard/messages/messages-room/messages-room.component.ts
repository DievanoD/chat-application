import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GroupMessageService } from './../../../../services/group-message.service';
import { GroupMessage } from './../../../../models/GroupMessage';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/models/Room';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-messages-room',
  templateUrl: './messages-room.component.html',
  styleUrls: ['./messages-room.component.css']
})
export class MessagesRoomComponent implements OnInit, OnDestroy {

  private currentUser: any;
  private currentRoom: Room;

  private messageText: string = null;
  messageValidator = true;

  private id: string;
  private sub: any;

  nameRoom = '';

  // DATE VARIABLES
  currentDate: any = '';

  private groupMessages: GroupMessage[] = [];

  constructor(private chatService: ChatService, private auth: AuthenticationService,
    private groupMessageService: GroupMessageService, private roomService: RoomService, private route: ActivatedRoute) {
    this.currentUser = this.auth.getSession('currentUser');
    // this.chatService.newUserJoined().subscribe(data => {
    //   console.log('Usuário: ' + data.user + 'juntou-se a sala.');
    // });
    this.chatService.newMessageReceived().subscribe(message => {
      this.groupMessages.push(message);
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.roomService.getRoomById(this.id).subscribe(room => {
      this.currentRoom = room;
      this.nameRoom = room.name;
    });

    this.loadMessages(this.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  send() {
    if (this.messageText !== null && this.messageText !== '') {
      this.messageValidator = true;
      // console.log('Clicou para enviar a msg...');
      this.chatService.sendMessage({ content: this.messageText, room: this.currentRoom, user: this.currentUser, createdAt: Date.now() });
      this.messageText = '';
      // this.feedback = "";
    } else {
      this.messageValidator = false;
      console.log('Mensagem inválida');
    }
  }

  loadMessages(id) {
    this.groupMessageService.getGroupMessages(id).subscribe(message => {
      this.groupMessages = message;
      console.log(this.groupMessages);
    });
  }

  monthFormat(month) {
    let newMonth = '';

    switch (month) {
      case '01':
        newMonth = 'JANEIRO';
        break;
      case '02':
        newMonth = 'FEVEREIRO';
        break;
      case '03':
        newMonth = 'MARÇO';
        break;
      case '04':
        newMonth = 'ABRIL';
        break;
      case '05':
        newMonth = 'MAIO';
        break;
      case '06':
        newMonth = 'JUNHO';
        break;
      case '07':
        newMonth = 'JULHO';
        break;
      case '08':
        newMonth = 'AGOSTO';
        break;
      case '09':
        newMonth = 'SETEMBRO';
        break;
      case '10':
        newMonth = 'OUTUBRO';
        break;
      case '11':
        newMonth = 'NOVEMBRO';
        break;
      case '12':
        newMonth = 'DEZEMBRO';
        break;
      default:
        newMonth = 'Month Invalid';
    }

    return newMonth;
  }

  formatDateMsg(date) {
    const format = 'dd/MM/yyyy';
    const receivedDate = formatDate(date, format, 'en-US');
    const currentDate = formatDate(Date.now(), format, 'en-US');
    let newDate = '';
    if (receivedDate === currentDate) {
      newDate = 'HOJE';
    } else {
      const day = formatDate(date, 'dd', 'en-US');
      const month = this.monthFormat(formatDate(date, 'MM', 'en-US'));
      const year = formatDate(date, 'yyyy', 'en-US');
      newDate = day + ' DE ' + month + ' DE ' + year;
      // console.log(newDate);
    }
    return newDate;
  }

  verifyDate(date) {
    const newDate = this.formatDateMsg(date);
    if (newDate !== this.currentDate) {
      this.currentDate = newDate;
      return true;
    } else {
      return false;
    }
  }

  // userJoinRoom(){
  //   this.chatService.joinRoom({room: this.currentRoom, user: this.currentUser});
  // }

  typingUser(nick) {
    // console.log(nick);
    this.chatService.typing(nick);
  }
}
