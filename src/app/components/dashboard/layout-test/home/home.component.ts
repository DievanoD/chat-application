import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // @ViewChild('sidebarCollapse') btnCollapse: ElementRef;
  // @ViewChild('sidebar') sidebar: ElementRef;
  // @ViewChild('content') content: ElementRef;

  collapsed = false;

  constructor() { }

  ngOnInit() {
    
  }

  collapseSidebar() {
    this.collapsed = !this.collapsed;
    // console.log(this.collapsed);
  }

}
