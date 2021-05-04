import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model'
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly Url = "http://localhost:3000/api/product" ;
  products: Product[];
  selectedProduct: Product;
  constructor(private http:HttpClient) { }


  saveProduct(name: string,price: string,quantity: string,description: string,animalType:string,image : File){
   // const product  : Product = {name:name,price:price,quantity:quantity,description: description,animalType:animalType}
   const prodData = new FormData();
   prodData.append("name",name);
   prodData.append("price", price);
   prodData.append("quantity", quantity);
   prodData.append("description",description);
   prodData.append("animalType",animalType);
   prodData.append("image",image,name);
   return this.http.post(this.Url, prodData )
  }

  getProductList(){
    return this.http.get(this.Url) ;
  }
  deleteProduct(id: string){
    return this.http.delete(this.Url+`/${id}`)
  }
  updateProduct(prod: Product, id: string){
    return this.http.put(this.Url+`/${id}`,prod)
  }

}
