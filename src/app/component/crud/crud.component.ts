import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from 'src/app/services/firebase.service';

import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  collection = { data: [] }
  materialForm: FormGroup;
  idFirebaseUpdate: string;
  updSave: boolean;
  config: any
  closeResult = "";

  //
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  urlFInd:Subscription;

  constructor(
    public fb: FormBuilder,
    private modalService: NgbModal,
    private fibaseService: FirebaseService,
    private readonly storage:AngularFireStorage) { }

  onUpload(e) {
    /* console.log(e.target.files[0]); */
    /* const id = Math.random().toString(36).substring(2); */
    const file = e.target.files[0];
    const filePath = `materiales/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(
        () => this.urlImage = ref.getDownloadURL())).subscribe();

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

  ngOnInit(): void {
    this.idFirebaseUpdate = "";

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length
    };

    this.materialForm = this.fb.group({
      material: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      url: ['', Validators.required]
    });

    this.fibaseService.getMaterial().subscribe(
      resp => {
        this.collection.data = resp.map((e: any) => {
          return {
            material: e.payload.doc.data().material,
            descripcion: e.payload.doc.data().descripcion,
            cantidad: e.payload.doc.data().cantidad,
            precio: e.payload.doc.data().precio,
            url: e.payload.doc.data().url,
            idFirebase: e.payload.doc.id
          }
        })
      },
      error => {
        console.error(error);
      }
    );    
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  eliminar(item: any): void {
    this.fibaseService.eliminarMaterial(item.idFirebase)
/*   this.collection.data.pop(item);
 */};

   guardar(url:string){
     this.materialForm.value.url=url;
    this.fibaseService.createMaterial(this.materialForm.value).
      then(resp => {
        this.materialForm.reset();
        this.modalService.dismissAll();
        this.urlImage=new Observable;
      })
      .catch(error => {
        console.error(error);

      })

  };

  actualizar(url:string) {
    //!isNullOrUndefined(this.idFirebaseUpdate)
    if (this.idFirebaseUpdate != null) {
      this.materialForm.value.url=url;
      this.fibaseService.updateMaterial(this.idFirebaseUpdate, this.materialForm.value).then(resp => {
        this.materialForm.reset();
        this.modalService.dismissAll();
        this.urlImage=new Observable;
      })
        .catch(error => {
          console.error(error);

        });
    }
  }


  //esto es codigo del modal
  editarMaterial(content, item: any) {
    this.updSave = true;
    //llenando formulario con los datos a editar
    this.materialForm.setValue({
      material: item.material,
      descripcion: item.descripcion,
      cantidad: item.cantidad,
      precio: item.precio,
      url: item.url
    });
    this.idFirebaseUpdate = item.idFirebase;

    //**//
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  nuevoMaterial(content) {
    this.updSave = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}