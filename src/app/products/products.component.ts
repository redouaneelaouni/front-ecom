import {Component, OnInit} from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {Product} from '../model/Product';
import {CaddyService} from '../services/caddy.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  editPhoto: boolean;
  currentProduct: any;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  p1: any;
  title: string;
  timeStamp: number = 0;
  product : Object;

  constructor(public catalogueService: CatalogueService,
              private route: ActivatedRoute, private router: Router,
  public authService:AuthenticationService,
  public caddyService:CaddyService) {


  }

  ngOnInit(): void {

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url);

        this.p1 = this.route.snapshot.params.p1;
        if (this.p1 == 1) {
          this.title = 'Sélection';
          this.getProducts('/products/search/selectedProducts');
        } else if (this.p1 == 2) {
          this.title = 'Produits de la catégorie';
          let idCat = this.route.snapshot.params.p2;
          this.getProducts('/categories/' + idCat + '/products');
        } else if (this.p1 == 3) {
          this.title = 'Produits en promotion';
          this.getProducts('/products/search/promoProducts');
        } else if (this.p1 == 4) {
          this.title = 'Produits dipsonible';
          this.getProducts('/products/search/dispoProducts');
        } else if (this.p1 == 5) {
          this.title = 'Recherche ...';
        }
      }
    });
    if (this.p1 == 1) {
      this.getProducts('/products/search/selectedProducts');
    }
  }

  private getProducts(url) {
    this.catalogueService.getResource(url)
      .subscribe(data => {
    this.products = data;
      }, error => {
        console.log(error);
      });
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

  onProductDetails(p:Product) {
    let url = btoa(p._links.product.href);
    this.router.navigateByUrl('/product-details/'+url);
  }

  onAddProductToCady(p: Product) {
      this.caddyService.addProductToCaddy(p);
  }
}
