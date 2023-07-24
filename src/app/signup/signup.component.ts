import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  signUp(): void {
    if (this.username === '' || this.password === '') {
      alert('Username and password cannot be empty.');
      return;
    }
  
    const user = {
      username: this.username,
      password: this.password
    };
  
    this.http.post<any>('https://blue-jolly-badger.cyclic.app/signup', user)
      .subscribe(
        () => {
          console.log('Sign up successful');
          // Redirect to login page after successful sign up
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Failed to sign up', error);
          alert('Signup Gagal!');
          // Handle sign up error, such as displaying an error message
        }
      );
  }
  
}
