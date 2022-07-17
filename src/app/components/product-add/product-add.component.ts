import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private productService:ProductService,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

createProductAddForm(){
  this.productAddForm = this.formBuilder.group({
    productName:["",Validators.required],
    unitPrice: ["",Validators.required],
    unitsInStock:["",Validators.required],
    categoryId: ["",Validators.required]
  })
}
add(){
  if (this.productAddForm.valid) {
    let productModel = Object.assign({},this.productAddForm.value);

    this.productService.add(productModel).subscribe(data => {
      console.log(data);
      this.toastrService.success(`${data.message}`,"Yay!");
    },responseError =>{
      if (responseError.error.Errors.length > 0) {
        responseError.error.Errors.forEach(((error:any) => {
            let message = error.ErrorMessage;
            this.toastrService.error(message,"Doğrulama Hatası");
        }));
      }
    });
  }
  else{
    this.toastrService.error("Formunuz eksik!","Dikkat!");
  }
 
}
}
