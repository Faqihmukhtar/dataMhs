import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tambah-mhs',
  templateUrl: './tambah-mhs.component.html',
  styleUrls: ['./tambah-mhs.component.css']
})
export class TambahMhsComponent {
  mahasiswa: any = {};

  constructor(private http: HttpClient, private router: Router) { }

  tambahMahasiswa(): void {
    this.http.post('https://blue-jolly-badger.cyclic.app/mahasiswas', this.mahasiswa)
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
}
