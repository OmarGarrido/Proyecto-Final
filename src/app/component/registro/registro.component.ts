import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  /* userForm = new FormGroup({
    name: new FormControl(''),
    birth: new FormControl(''),
    number:new FormControl(''),
    address: new FormControl('')
  }); */

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authSer: AuthService,
    private firebaseServ: FirebaseService
  ) { }

  ngOnInit(): void {
  }

  /* onUpUser(){
    this.firebaseServ.createUser(this.userForm);
  } */

  onRegister() {
    const { email, password } = this.loginForm.value
    this.authSer.register(email, password);

  }

}
