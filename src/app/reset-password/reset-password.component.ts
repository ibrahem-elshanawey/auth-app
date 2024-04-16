import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) {
    this.resetForm = this.fb.group({
      userId: ['', [Validators.required]],
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      const { userId, oldPassword, newPassword } = this.resetForm.value;

      this.authService.resetPassword(userId, oldPassword, newPassword)
        .subscribe(
          response => {
            console.log(response);
            this.route.navigateByUrl('/login');
          },
          error => {
            console.error('Reset password error:', error);
            // Handle error (e.g., display error message to user)
          }
        );
    }
  }
}

