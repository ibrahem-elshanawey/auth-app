import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,private route:Router) {}

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUsername(): string | null {
    const username = this.authService.getUsername();
    console.log('Username from AuthService:', username);
    return username;
  }


  logout(): void {
    this.authService.logout();
    this.route.navigateByUrl('/login');
  }
}
