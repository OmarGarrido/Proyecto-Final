import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any = []
  id: any
  constructor(
    private firebaseServ: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();

  }

  verMaterial(item: any) {
    this.firebaseServ.sendObjectSorce(item)
    this.router.navigate(['details',item.material])
  }

  loadData() {
    this.firebaseServ.getMaterial().subscribe(
      res => {
        this.data = res.map((e: any) => {
          return {
            material: e.payload.doc.data().material,
            descripcion: e.payload.doc.data().descripcion,
            cantidad: e.payload.doc.data().cantidad,
            precio: e.payload.doc.data().precio,
            url: e.payload.doc.data().url,
            idFirebase: e.payload.doc.id
          }
        })
      });
  }

}
