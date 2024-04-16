import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private route: Router) { }

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe(
      response => {
        this.route.navigateByUrl('/home')
      },
      error => {
        // Handle login error
      }
    );
  }
}
