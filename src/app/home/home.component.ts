import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../authService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mahasiswas!: any[];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchMahasiswas();
  }

  fetchMahasiswas(): void {
    this.http.get<any[]>('https://blue-jolly-badger.cyclic.app/mahasiswas')
      .subscribe(mahasiswas => {
        this.mahasiswas = mahasiswas;
      });
  }

  deleteMahasiswa(mahasiswa: any): void {
    const url = `https://blue-jolly-badger.cyclic.app/mahasiswas/${mahasiswa._id}`;
    this.http.delete(url)
      .subscribe(() => {
        this.fetchMahasiswas();
      });
  }

  editMahasiswa(mahasiswaId: string): void {
  this.router.navigate(['/ubah', mahasiswaId]);
}

isLoggedIn(): boolean {
  return this.authService.isLoggedIn();
}




}
