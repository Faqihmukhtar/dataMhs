import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful');
        // alert('Login berhasil, Selamat datang!'); 
        this.router.navigate(['/members']); 
      },
      error => {
        console.error('Login error', error);
        if (error.error && error.error.error === 'Incorrect username') {
          alert('Username tidak ditemukan');
        } else if (error.error && error.error.error === 'Incorrect password') {
          alert('Password yang dimasukkan salah');
        } else {
          alert('Login gagal!'); 
        }
      }
    );
  }
  
}
