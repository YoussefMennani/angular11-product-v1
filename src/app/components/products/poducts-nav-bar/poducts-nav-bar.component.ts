import { ProductActionsTypes, ActionEvent } from './../../../state/product.state';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-poducts-nav-bar',
  templateUrl: './poducts-nav-bar.component.html',
  styleUrls: ['./poducts-nav-bar.component.css']
})
export class PoductsNavBarComponent {

  
  @Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter();

  public onGetAllProducts() {
    this.productEventEmitter.emit({type:ProductActionsTypes.GET_ALL_PRODUCTS})
  }


  public onGetSelectedProducts() {
    this.productEventEmitter.emit({type:ProductActionsTypes.GET_SELECTED_PRODUCTS})
  }


  public onGetAvailableProducts() {
    this.productEventEmitter.emit({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS})
  }

  onSearch(dataForm: any) {
    this.productEventEmitter.emit({type:ProductActionsTypes.SEARCH_PRODUCTS})

  }

  
  onNewProduct() {

    this.productEventEmitter.emit({type:ProductActionsTypes.NEW_PRODUCT})
  }


}
