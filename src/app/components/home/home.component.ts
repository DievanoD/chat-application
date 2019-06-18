import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // @ViewChild('sidebarCollapse') btnCollapse: ElementRef;
  // @ViewChild('sidebar') sidebar: ElementRef;
  // @ViewChild('content') content: ElementRef;

  currentUser: any;

  collapsed = false;
  titleNav = '';
  descriptionNav = '';

  constructor(private auth: AuthenticationService) {
    this.currentUser = this.auth.getSession('currentUser');
  }

  ngOnInit() {
  }

  collapseSidebar() {
    this.collapsed = !this.collapsed;
    // console.log(this.collapsed);
  }

  logout() {
    this.auth.logout();
  }

}
