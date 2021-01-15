import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from 'src/app/services/firebase.service';

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

  constructor(
    public fb: FormBuilder,
    private modalService: NgbModal,
    private fibaseService: FirebaseService) { }

  ngOnInit(): void {
    this.idFirebaseUpdate = "";

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length
    };

    this.materialForm = this.fb.group({
      material: ['', Validators.required],
      marca: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required]
    });

    this.fibaseService.getMaterial().subscribe(
      resp => {
        this.collection.data = resp.map((e: any) => {
          return {
            material: e.payload.doc.data().material,
            marca: e.payload.doc.data().marca,
            cantidad: e.payload.doc.data().cantidad,
            precio: e.payload.doc.data().precio,
            idFirebase: e.payload.doc.id
          }
        })
      },
      error => {
        console.error(error);
      }
    );
    console.log(this.collection.data);
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  eliminar(item: any): void {
    this.fibaseService.eliminarMaterial(item.idFirebase)
/*   this.collection.data.pop(item);
 */};

  guardar(): void {

    this.fibaseService.createMaterial(this.materialForm.value).
      then(resp => {
        this.materialForm.reset();
        this.modalService.dismissAll();
      })
      .catch(error => {
        console.error(error);

      })

  };

  actualizar() {
    //!isNullOrUndefined(this.idFirebaseUpdate)
    if (this.idFirebaseUpdate != null) {
      this.fibaseService.updateMaterial(this.idFirebaseUpdate, this.materialForm.value).then(resp => {
        this.materialForm.reset();
        this.modalService.dismissAll();
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
      marca: item.marca,
      cantidad: item.cantidad,
      precio: item.precio
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