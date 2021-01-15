import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudComponent } from './component/crud/crud.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegistroComponent } from './component/registro/registro.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { environment } from 'src/environments/environment';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NgImagesFilesDirective } from './component/home/directives/ng-images-files.directive';

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    NgImagesFilesDirective
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule

  ],
  providers: [
    { provide: BUCKET, useValue: 'gs://inventario-construccion.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
