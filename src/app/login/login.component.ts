import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) { }
  ngOnInit(): void {
   this.loginForm = this.fb.group({
    username: ['Admin', [Validators.required, Validators.pattern(/^\S+$/)]],
    password: ['Admin', [Validators.required, Validators.minLength(5)]],
   });
  }

  login() {
    if ( this.loginForm.valid && this.loginForm.value['username'] === 'Admin' && this.loginForm.value['password'] === 'Admin') {
      // Set the session token upon successful login
      sessionStorage.setItem('token', 'your_secret_token_here');
      this.router.navigate(['/home']);
    } else {
      alert('Invalid username or password');
    }
  }
}
