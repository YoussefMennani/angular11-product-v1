import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  productFormGroup!:FormGroup;
  submitted:boolean=false;
  constructor(private fb:FormBuilder,private productsService:ProductsService){}

  ngOnInit():void{
    this.productFormGroup = this.fb.group({
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required]
    })
  }

  onSaveProduct(){
    console.log(this.productFormGroup.controls["name"].errors)
    this.submitted=true
    if (this.productFormGroup.invalid) return;
    this.productsService.saveProduct(this.productFormGroup.value).subscribe(data=>{
      alert("success saving Data ...")
      this.productFormGroup.reset();
      this.submitted=false
    })
  }
}
