import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  submitted = false;

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Acessar facilmente os controls do formulário
  get f() {
    return this.loginForm.controls;
  }

  onFormSubmit(form: NgForm) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    const val = this.loginForm.value;

    if (val.username && val.password) {
      this.authenticationService.login(val.username, val.password).subscribe(
          () => {
            // console.log('User is logged in');
            this.router.navigateByUrl('/home/rooms');
          }
        );
    }
    // this.loading = true;
    // this.authenticationService.login(username, password)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //           // this.router.navigate([this.returnUrl]);
    //         },
    //         error => {
    //           console.log("Error: " + error);
    //             // this.alertService.error(error);
    //             // this.loading = false;
    //         });
  }

}
