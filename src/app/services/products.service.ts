import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) {}
  

  getAllProducts():Observable<Product[]>{
    // let host = environment.unreachableHost;
    let host = environment.host;
    return this.http.get<Product[]>(host+"/products");
  }

  getSelectedProducts():Observable<Product[]>{
    // let host = environment.unreachableHost;
    let host = environment.host;
    return this.http.get<Product[]>(host+"/products?selected=true");
  }


  getAvailableProducts():Observable<Product[]>{
    // let host = environment.unreachableHost;
    let host = environment.host;
    return this.http.get<Product[]>(host+"/products?available=true");
  }

  searchProducts(keyword:any):Observable<Product[]>{
    // let host = environment.unreachableHost;
    let host = environment.host;
    return this.http.get<Product[]>(host+"/products?name_like="+keyword);
  }

  deleteProduct(idProduct:number):Observable<boolean>{
    // let host = environment.unreachableHost;
    let host = environment.host;
    return this.http.delete<boolean>(host+"/products/"+idProduct);
  }


  EditProduct(idProduct:number):Observable<Product[]>{
    // let host = environment.unreachableHost;
    let host = environment.host;
    return this.http.get<Product[]>(host+"/products?name_like="+idProduct);
  }

  saveProduct(product:Product):Observable<Product>{
    let host = environment.host;
    return this.http.post<Product>(host+"/products",product);
  }

  getProductById(productId:number){
    let host = environment.host;
    return this.http.get<Product>(host+"/products/"+productId);
  }

  updateProduct(product:Product):Observable<Product>{
    console.log(" product ...")
    console.log(product)
    let host = environment.host;
    return this.http.put<Product>(host+"/products/"+product.id,product);
  }
}
