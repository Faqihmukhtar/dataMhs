import { Component } from '@angular/core';
import { AuthService } from './authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dataMhs';

  constructor(public authService: AuthService, private router: Router) { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('token'); // Menghapus token dari local storage
    this.router.navigate(['/login']);
  }
}
