import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { cartItems } from 'src/app/models/cartItems';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

//axios/fetch
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

//ProductComponent açıldığında çalışan kod ngOnInıt'tir
export class ProductComponent implements OnInit {
 
  products:Product[] = [];
  dataLoaded:boolean = false;
  filterText = "";

  //constructor'da sınıf initialize edilir yani instance oluşturulur.
  //constructor'da tanımladığımız tip sanki class'ın içide tanımlanmış gibi olur.Methodlar'da this ile erişebiliriz.
  constructor(private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private toastr: ToastrService,
    private cartService:CartService) {
    // const id: Observable<string> = activatedRoute.params.pipe(map(p => p.categoryId));
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if (params["categoryId"]) {
        this.getProductsByCategory(params["categoryId"])
      }
      else{
        this.getProducts();
      }
    })
    // this.getProducts();
   
  }
  getProducts(){
    this.productService.getProducts().subscribe(response =>{
      this.products = response.data
      this.dataLoaded = true;
    })
  }
  getProductsByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId).subscribe(response =>{
      this.products = response.data
      this.dataLoaded = true
    })
  }
  addToCart(product:Product) {
    
    this.cartService.addToCart(product);
    this.toastr.success('başarılı bir şekilde sepete eklendi.',`${product.productName}`,{
      positionClass: "toast-bottom-right"
    });
  }

 
  
  

}
