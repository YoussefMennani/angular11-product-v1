import { DataStateEnum, AppDataState } from './../../state/product.state';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from './../../model/product.model';
import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;


  constructor(private productsService: ProductsService,
    private router: Router,
    ) { }
  ngOnInit(): void {
    this.onGetAllProducts()
  }
  public onGetAllProducts() {
    this.products$ = this.productsService.getAllProducts().pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data: data })
      ),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }


  public onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map((data) => {
        console.log(data)
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }


  public onGetAvailableProducts() {
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map((data) => {
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onSearch(dataForm: any) {

    this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map((data) => {
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );

  }

  onDelete(idProduct: number) {
    let v = confirm(" êtes Vous sur ?")
    if (v) {
      this.productsService.deleteProduct(idProduct).subscribe({
        next: (data) => {
          console.log(data)
          this.onGetAllProducts()
        },
        error: (err) => {
          return err;
        }
      })
    }
  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct")
  }


  onEditProduct(idProduct:number) {

    this.router.navigateByUrl("/editProduct/"+idProduct)
  }

}
