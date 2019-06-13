import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/Message';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // providers: [ChatService]
})
export class DashboardComponent implements OnInit {

  // @ViewChild('messageBox') msgBox: ElementRef;

  currentUser: any;
  // messageText: string;
  // feedback: string;

  // private messages: Message[] = [];

  // messageArray:Array<{user:String,message:String}> = [];

  constructor(private auth: AuthenticationService) {
    this.currentUser = this.auth.getSession('currentUser');

    // this.loadMessages();

    // // this.divOutput = `<p>This is my html coontent</p>`
    // // this.divOutput += `<p>This is my html coontent2</p>`
    // this.chatService.newMessageReceived().subscribe(message => {
    //   this.messages.push(message);
    // });
  }

  ngOnInit() {
  }

  // send() {
  //   console.log('Clicou para enviar a msg...');
  //   this.chatService.sendMessage({content: this.messageText, user: this.currentUser});
  //   this.messageText = '';
  //   // this.feedback = "";
  // }

  // loadMessages() {
  //   this.messageService.getMessages().subscribe(message => {
  //     this.messages = message;
  //   });
  // }

  logout() {
    this.auth.logout();
  }

  // typingUser(nick) {
  //   // console.log(nick);
  //   this.chatService.typing(nick);
  // }

  // stopWrite() {
  //   // this.feedback = '';
  //   // console.log('Parou de escrever!');
  // }
}
