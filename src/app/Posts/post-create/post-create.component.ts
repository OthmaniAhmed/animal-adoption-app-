import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from "@angular/router"
import { Post } from '../post.model';

import { PostsService } from '../posts.service';
import { mimeType } from './mime-type.validator' ;


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  entredUsername='' ;
  entredContent='' ;
  private mode = 'create';
  private postId : string ;
  post: Post;
  isLoading = false;
  form : FormGroup ;
  imagePreview : string ;


  constructor(public postServise: PostsService,public route:ActivatedRoute) { }


  ngOnInit() : void{
    this.form = new FormGroup({
      content : new FormControl(null, {validators :[Validators.required]}),
      image: new FormControl(null,{validators :[Validators.required], asyncValidators:[mimeType]})
      //asyncValidators is for the img file type
    }) ;
    this.route.paramMap.subscribe((paramMap : ParamMap) => {
          if(paramMap.has('postId')){
              this.mode = 'edit';
              this.postId= paramMap.get('postId');
              this.isLoading = true;
              this.postServise.getPost(this.postId).subscribe(postData =>{
                this.isLoading =  false;
                this.post = {id: postData._id,
                  content :postData.content,
                  imagePath: postData.imagePath,
                  creator : postData.creator ,
                  creatorName : postData. creatorName,
                  creatorEmail : postData.creator, 
                  creatorState : postData.creator, 
                  creatorPhone : postData.creator,
                };
              this.form.setValue({
                  content : this.post.content,
                  image : this.post.imagePath,
                 
                });
              });
              
          }else{
            this.mode='create';
            this.postId= null ;
          }
    });
  }
  onImagePicked(event : Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  
  onSavePost(){
    if (this.form.invalid){
      console.log("1")
      return
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      console.log("2")
      this.postServise.addPost(this.form.value.content, this.form.value.image);
      
    }else{
      
      this.postServise.updatePost(this.postId, this.form.value.content,this.form.value.image);
    }
   this.form.reset();
   
  }
  
}
