import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ubah-mhs',
  templateUrl: './ubah-mhs.component.html',
  styleUrls: ['./ubah-mhs.component.css']
})
export class UbahMhsComponent implements OnInit {
  mahasiswaId: string = '';
  mahasiswa: any = {};

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.mahasiswaId = this.route.snapshot.params['id'];
    this.fetchMahasiswa(this.mahasiswaId);
  }

  fetchMahasiswa(mahasiswaId: string): void {
    const url = `https://blue-jolly-badger.cyclic.app/mahasiswas/${mahasiswaId}`;
    this.http.get(url)
      .subscribe((mahasiswa: any) => {
        this.mahasiswa = mahasiswa;
      });
  }

  editMahasiswa(): void {
    const url = `https://blue-jolly-badger.cyclic.app/mahasiswas/${this.mahasiswaId}`;
    this.http.put(url, this.mahasiswa)
      .subscribe(() => {
        console.log('Mahasiswa updated successfully');
        // Lakukan tindakan setelah mengedit mahasiswa, jika diperlukan
        alert('Data mahasiswa berhasil diubah!');
        this.router.navigate(['/home']);
      }, error => {
        console.log('Failed to update mahasiswa', error);
      });
  }
}
