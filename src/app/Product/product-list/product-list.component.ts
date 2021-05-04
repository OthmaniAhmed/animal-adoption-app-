import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(public prodService : ProductService) { }
 dogs_producs = [] ;
 cats_producs = [] ;
 birds_producs = [] ;
 fish_producs = [] ;
 
  ngOnInit(): void {
    this.refreshProductionList();
  }

  refreshProductionList(){
    this.prodService.getProductList().subscribe((res) => {
      this.prodService.products = res as Product[] ;
      if(this.prodService.products){
        for(let prod of this.prodService.products){
          switch(prod.animalType) { 
            case "Dog": { 
              this.dogs_producs.push(prod)
               break; 
            } 
            case "Cat": { 
              this.cats_producs.push(prod)
               break; 
            } 
            case "Fish": { 
              this.fish_producs.push(prod)
               break; 
            }
            case "Fish": { 
              this.birds_producs.push(prod)
               break; 
            }
         } 
        }
      }
    }) ;
  }
}
