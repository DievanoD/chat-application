import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() user = new User();

  userRegisterForm: FormGroup;

  submitted = false;

  constructor(private api: AuthenticationService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userRegisterForm = this.formBuilder.group({
      name: ['', Validators.required],
      nickname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Acessar facilmente os controls do formulário
  get f() {
    return this.userRegisterForm.controls;
  }

  onFormSubmit(form: NgForm) {
    this.submitted = true;
    // this.isLoadingResults = true;

    if (this.userRegisterForm.valid) {
      const val = this.userRegisterForm.value;

      if (val.password === val.confirmPassword) {
        this.user = new User();
        this.user.name = val.name;
        this.user.nickname = val.nickname;
        this.user.email = val.email;
        this.user.password = val.password;

        this.api.register(this.user)
          .subscribe(res => {
            console.log(res);
            this.router.navigate(['login']);
            // let id = res['codigo'];
            // this.isLoadingResults = false;
            // this.router.navigate(['/users-details', id]);
          }, (err) => {
            console.log(err);
            // this.isLoadingResults = false;
          });
      } else {
        console.log('Senhas não conferem!');
      }
    } else {
      console.log('Form Inválido!');
      Object.keys(this.userRegisterForm.controls).forEach(campo => {
        // console.log(campo);

        // const controle = this.userRegisterForm.get(campo);
        // controle.markAsDirty();
      });
    }

  }

}
