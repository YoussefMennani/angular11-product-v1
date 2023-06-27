import { ActionEvent, ProductActionsTypes } from './../../../../state/product.state';
import { Product } from './../../../../model/product.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input() product!:Product;
  @Output() eventEmitter : EventEmitter<ActionEvent> = new EventEmitter();

  onDelete(idProduct:number){
    this.eventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:idProduct})
  }

  onEditProduct(idProduct:number){
    this.eventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT,payload:idProduct})
  }
}
