import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { FileItem } from './models/helper/file-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [StorageService]
})
export class HomeComponent implements OnInit {
  files: FileItem[] = [];
  isOverDrop = false;


  constructor(private readonly storageServ: StorageService) { }

  ngOnInit(): void {
  }

  onUpload() {
    this.storageServ.uploadImage(this.files)
  }

}
