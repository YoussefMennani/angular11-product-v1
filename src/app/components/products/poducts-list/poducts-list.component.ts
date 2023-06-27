import { Product } from './../../../model/product.model';
import { AppDataState, DataStateEnum, ActionEvent, ProductActionsTypes } from './../../../state/product.state';
import { Observable } from 'rxjs';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-poducts-list',
  templateUrl: './poducts-list.component.html',
  styleUrls: ['./poducts-list.component.css']
})
export class PoductsListComponent {

  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;
  //@Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter();


  readonly DataStateEnum = DataStateEnum;
/*
  onDelete(idProduct:number){
    this.productEventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:idProduct})
  }

  onEditProduct(idProduct:number){
    this.productEventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT,payload:idProduct})
  }

  onActionEvent($event:ActionEvent){
    this.productEventEmitter.emit($event);
  }
*/
}
