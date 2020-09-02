import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../catalogue.service';
import {Product} from '../model/Product';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  mode:number = 0;
   currentProduct: any;
   editPhoto: boolean;
   selectedFiles: any;
   progress: number;
   currentFileUpload: any;
   timeStamp: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              public authenticationService : AuthenticationService,
              public catalogueService: CatalogueService) {
  }

  ngOnInit(): void {
    let url = atob(this.activatedRoute.snapshot.params.url);
    console.log(url);
    this.catalogueService.getProductDetail(url).subscribe(data => {
        this.product = data;
      }
    );

  }

  onEditProduct() {
    this.mode = 1;
  }
  onEditPhoto(p: any) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catalogueService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);

      } else if (event instanceof HttpResponse) {
        this.timeStamp = Date.now();
      }
    });

  }

  getTimeStamp() {
    return this.timeStamp;
  }

  onAddProductToCady(currentProduct: any) {

  }

  onUpdateProduct() {

  }
}
