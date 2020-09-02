import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './model/Product';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  public getResource(url) {
    return this.httpClient.get(this.host + url);
  }

  public getProductDetail(url):Observable<Product>{
    return this.httpClient.get<Product>(url);
  }

  uploadPhotoProduct(file: File,idProduct): Observable<HttpEvent<{}>> {
    let formData : FormData = new FormData();
    formData.append('file',file);
    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduct,formData,{reportProgress:true,responseType:'text'});
    return this.httpClient.request(req);
  }
}
