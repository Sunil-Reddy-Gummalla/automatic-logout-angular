import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    // Check if a session token exists
    const token = sessionStorage.getItem('token');

    if (token) {
      return true; // User is logged in and can access the route
    } else {
      this.router.navigate(['/login']); // Redirect to the login page if not logged in
      return false; // Prevent access to the route
    }
  }
}
