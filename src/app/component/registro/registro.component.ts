import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  loginForm=new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authSer:AuthService
  ) { }

  ngOnInit(): void {
  }

  onRegister(){
  const {email,password}= this.loginForm.value
  this.authSer.register(email,password);
  }

}
