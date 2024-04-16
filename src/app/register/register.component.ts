import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService ,private route:Router) {}

  onSubmit(): void {
    this.authService.register(this.user).subscribe(
      response => {
        this.route.navigateByUrl('/login');
      },
      error => {
        // Handle registration error
      }
    );
  }
}
