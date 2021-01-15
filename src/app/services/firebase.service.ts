import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore
  ) { }

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


