import { Component, OnInit, Input } from '@angular/core';
import { UserApiService } from 'src/app/services/user-api.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountForm: FormGroup;

  @Input() user = new User();

  submitted = false;

  userData = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private userService: UserApiService, private formBuilder: FormBuilder, private auth: AuthenticationService) {
    this.loadData();
  }

  get f() {
    return this.accountForm.controls;
  }

  loadData() {

    // console.log(userData._id);

    this.userService.getUserById(this.userData._id).subscribe(user => {
      // console.log(user);
      this.f.name.setValue(user.name);
      this.f.nickname.setValue(user.nickname);
      this.f.email.setValue(user.email);
      this.f.password.setValue(user.password);
    });
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (this.accountForm.valid) {
      const val = this.accountForm.value;

      this.user = new User();
      this.user.name = val.name;
      this.user.nickname = val.nickname;
      this.user.email = val.email;
      this.user.password = val.password;

      this.userService.updateUser(this.userData._id, this.user).subscribe(user => {
        console.log(user);
      });
    }
  }


  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      name: ['', Validators.required],
      nickname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

}
