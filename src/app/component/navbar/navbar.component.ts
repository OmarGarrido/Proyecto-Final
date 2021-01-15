import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  band: boolean;

  public user$:Observable<any>=this.authServ.afServ.user;
  constructor(
    private authServ:AuthService ) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.authServ.logout();
    this.band=false;
  }

}
