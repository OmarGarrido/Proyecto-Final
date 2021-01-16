import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  objecjSorce = new BehaviorSubject<{}>({})
  data: any = []

  $getObjecjtSorce = this.objecjSorce.asObservable();


  constructor(
    private firestore: AngularFirestore,
    private router: Router) { }

  getUser() {
    return this.firestore.collection("usuarios").snapshotChanges();
  }

  createUser(user: any) {
    return this.firestore.collection("usuarios").add(user);
  }

  sendObjectSorce(data: any) {
    this.objecjSorce.next(data);
  }

  getMaterial() {
    return this.firestore.collection("Material").snapshotChanges();
  }

  createMaterial(Material: any) {
    return this.firestore.collection("Material").add(Material);
  }

  updateMaterial(id: any, material: any) {
    return this.firestore.collection("Material").doc(id).update(material);
  }

  eliminarMaterial(id: any) {
    return this.firestore.collection("Material").doc(id).delete();
  }

  agregarUrl(material: any) {
    return this.firestore.collection("Material").doc(material.id).update(material.url);
  }


}


