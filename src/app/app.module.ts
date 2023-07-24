import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TambahMhsComponent } from './tambah-mhs/tambah-mhs.component';
import { UbahMhsComponent } from './ubah-mhs/ubah-mhs.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './authGuard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TambahMhsComponent,
    UbahMhsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'tambah', component: TambahMhsComponent, canActivate: [AuthGuard]},
      { path: 'ubah', component: UbahMhsComponent},
      { path: 'ubah/:id', component: UbahMhsComponent},
      { path: 'login', component: LoginComponent},
      { path: 'signup', component: SignupComponent},
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
