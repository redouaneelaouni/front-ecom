import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CatalogueService} from './catalogue.service';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {CaddyService} from './services/caddy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  currentCategorie;
  title = 'ecom-web';
  categories;

  constructor(private catalogueService: CatalogueService,
              private router: Router,private authenticationService: AuthenticationService,
              public caddyService:CaddyService) {

  }

  ngOnInit(): void {
    this.authenticationService.loadAuthentificatedUserFromLocalStorage();
    this.getCaegories();

    console.log(this.caddyService.caddies);
  }

  private getCaegories() {
    this.catalogueService.getResource('/categories')
      .subscribe(data => {
        this.categories = data;
      }, error => {
        console.log(error);
      });
  }

  getProductsByCategories(id) {
    this.currentCategorie = id;
    this.router.navigateByUrl('/products/2/' + id);
  }

  onSelectedProducts() {
    this.currentCategorie = undefined;
    this.router.navigateByUrl('/products/1/0');
  }

  onProductsPromo() {
    this.currentCategorie = undefined;
    this.router.navigateByUrl('/products/3/0');
  }

  onProductsDispo() {
    this.currentCategorie = undefined;
    this.router.navigateByUrl('/products/4/0');
  }

  onLogout() {
    this.authenticationService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }

  ngAfterViewInit(): void {
  }
}
