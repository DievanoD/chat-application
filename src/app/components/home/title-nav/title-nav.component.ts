import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-title-nav',
  templateUrl: './title-nav.component.html',
  styleUrls: ['./title-nav.component.css']
})
export class TitleNavComponent implements OnInit {

  @Input() tituloDaSala;

  constructor() { }

  ngOnInit() {
    console.log(this.tituloDaSala);
  }

}
