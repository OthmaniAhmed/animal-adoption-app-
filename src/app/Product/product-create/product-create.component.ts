import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  Animals: string[] = ['Dog','Cat','Fish','Birds'];
  updateMode = false ; 
  updateProdId : string ;
  imagePreview: string;
  theImage : File;
  
  constructor(public prodService :ProductService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshProductionList() ;
  }
  
 onSubmit(form : NgForm){
    if(form.invalid){
      return;
    }
    else if (this.updateMode == true) {
     this.prodService.updateProduct(form.value,this.updateProdId ).subscribe((res)=>{
      this.resetForm(form)
      this.refreshProductionList() ;
      this.updateMode = false ;
      }) 
    } else {
      this.prodService.saveProduct(form.value.name,form.value.price,form.value.quantity,form.value.description,form.value.animalType,this.theImage)
      .subscribe((res)=>{
        this.resetForm();
        this.refreshProductionList()
      });
    }
  }

  
  resetForm(form?: NgForm){
    if(form)
      form.reset();
    this.prodService.selectedProduct = {
    name : "" ,
    price : null ,
    quantity : null ,
    description : "" ,
    animalType :"",
    imagePath :"" ,
  
      }  
  }
  refreshProductionList(){
    this.prodService.getProductList().subscribe((res) => {
      this.prodService.products = res as Product[] ;
    }) ;
  }
  newProductList(){
    this.prodService.getProductList()
    .subscribe((res)=>{
     this.prodService.products = res as Product[] ;
    })
  }

  onEdit(prod : Product, id: string){
    this.prodService.selectedProduct = prod;
    this.updateMode = true ;
 
    this.updateProdId = id;
  }
 
  onDelete(id){
    if(confirm('Are you sure to delete this Product?')==true){
      this.prodService.deleteProduct(id)
      .subscribe((res)=>{
        this.refreshProductionList() ;
      })
    }
  }

  onImagePicked(event : Event){
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      reader.onload = () =>{
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.theImage = file;
    }
    
}


