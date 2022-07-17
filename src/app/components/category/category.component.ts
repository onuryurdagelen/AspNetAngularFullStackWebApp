import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  currentCategory:Category;
  isActiveAllProduct:boolean = false;
  constructor(private categoryService:CategoryService,private productService:ProductService) { 
    
    }

  ngOnInit(): void {
    console.log("category çalıştı...")
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response.data
    })   
  }
  setCurrentCategory(category:Category){
    this.currentCategory = category;
    this.isActiveAllProduct =false
  }

  getCurrentCategoryClass(category:Category){
    if(category ==this.currentCategory && !this.isActiveAllProduct){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  getAllCategoryClass(){
       if(!this.currentCategory || this.isActiveAllProduct){
        return "list-group-item active"
       }
       else{
        return "list-group-item"
       }
 }
 allProductsCategoryClass(category:string){
  if(this.currentCategory?.categoryName != category){
    console.log("Girdi")
    this.isActiveAllProduct = true
   }
   else{
    this.isActiveAllProduct = false
   }
 }
}
  
  
