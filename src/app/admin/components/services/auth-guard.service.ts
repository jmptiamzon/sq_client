import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== 'dummy' ) {
      // mali to
      return true;

    } else {
      this.router.navigate(['/admin/login']);
      return false;
    }
  }

}
