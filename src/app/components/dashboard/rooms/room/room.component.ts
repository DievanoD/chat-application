import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/Room';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  @Input() room = new Room();

  submitted = false;

  formCreateRoom: FormGroup;

  // roomIsPublic = true;

  private rooms: Room[] = [];

  @ViewChild('btnCloseModal') btnModal: ElementRef;

  constructor(private roomService: RoomService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.roomService.getRooms().subscribe(room => {
      this.rooms = room;
      console.log(this.rooms);
    });


    this.formCreateRoom = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      password: ['', Validators.minLength(8)],
      is_public: ['']
    });

    this.formCreateRoom.get('is_public').setValue('true');
  }

  get f() {
    return this.formCreateRoom.controls;
  }

  // setPublic() {
  //   this.roomIsPublic = true;
  // }

  // setPrivate() {
  //   this.roomIsPublic = false;
  // }

  private closeModal() {
    this.btnModal.nativeElement.click();
  }

  private resetForm() {
    this.f.name.reset();
    this.f.description.reset();
    // this.f.is_public.reset();
    this.f.password.reset();
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    // console.log(this.formCreateRoom.value + ' | ' + this.formCreateRoom.valid);

    if (this.formCreateRoom.valid) {
      const val = this.formCreateRoom.value;

      this.room = new Room();

      this.room.name = val.name;
      this.room.description = val.description;
      this.room.password = val.password;
      console.log('PUBLICA: ' + val.is_public);
      // this.room.is_public = (val.is_public === 'true' ? true : false);
      this.room.is_public = val.is_public;

      this.roomService.createRoom(this.room).subscribe(room => {
        // console.log('Sala: ' + JSON.stringify(room));
        this.rooms.push(room);

        this.closeModal();
        // this.resetForm();
      }, (err) => {
        console.log(err);
      });
    } else {
      console.log('Invalid Form');
    }

  }

}
