import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // const currentUser = localStorage.getItem('currentUser');

    // if (!currentUser) {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    // return true;

    if (localStorage.id_token != null && localStorage.id_token !== '') {
      return true;
    } else {
        this.router.navigate(['login']);
    }
  }

}
