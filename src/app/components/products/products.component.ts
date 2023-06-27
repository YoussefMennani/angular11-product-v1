import { EventDriverService } from './../../state/event.driver.service';
import { DataStateEnum, AppDataState, ProductActionsTypes, ActionEvent } from './../../state/product.state';
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
    private eventDrivenSevice:EventDriverService
    ) { }
  ngOnInit(): void {
    // this.onGetAllProducts()
    this.onGetAllProducts()
    this.eventDrivenSevice.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    })
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

  onActionEvent($event:ActionEvent){
    
    switch($event.type){
      case ProductActionsTypes.GET_ALL_PRODUCTS : this.onGetAllProducts();break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS : this.onGetSelectedProducts();break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS : this.onGetAvailableProducts();break;
      case ProductActionsTypes.SEARCH_PRODUCTS : this.onSearch($event.payload);break;
      case ProductActionsTypes.NEW_PRODUCT : this.onNewProduct();break;
      case ProductActionsTypes.DELETE_PRODUCT : this.onDelete($event.payload);break;
      case ProductActionsTypes.EDIT_PRODUCT : this.onEditProduct($event.payload);break;
      case ProductActionsTypes.SELECT_PRODUCT : this.onNewProduct();break;
    }
    
  }

}
