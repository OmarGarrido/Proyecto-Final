import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  material: any={}
  constructor(
    private firebaseServ: FirebaseService
  ) {}


  ngOnInit(): void {
    this.firebaseServ.$getObjecjtSorce.subscribe(data=>this.material=data).unsubscribe();
    console.log(this.material);
  }

}
