import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {

  productId: number;
  productFormGroup!: FormGroup;
  submitted!: boolean;
  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private toastr: ToastrService) {
    this.productId = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit() {
    this.productService.getProductById(this.productId).subscribe(product => {
      console.log(product)

      this.productFormGroup = this.fb.group({
        id:[product.id],
        name: [product.name, Validators.required],
        price: [product.price, Validators.required],
        quantity: [product.quantity, Validators.required],
        selected: [product.selected, Validators.required],
        available: [product.available, Validators.required],
      })
    })
  }


  onUpdateProduct() {
    console.log(this.productFormGroup.controls["name"].errors)
    this.submitted = true
    if (this.productFormGroup.invalid) return;
    this.productService.updateProduct(this.productFormGroup.value).subscribe(data => {

      // const config: MatSnackBarConfig = {
      //   duration: 3000,
      //   panelClass: ['green-toast'],
      //   verticalPosition: 'top',
      // };
  
      // this.snackBar.open('Updated with success !', 'Close', config);

      this.toastr.success('Hello world!', 'Toastr fun!');
      
      this.submitted = false
    })
  }

}
