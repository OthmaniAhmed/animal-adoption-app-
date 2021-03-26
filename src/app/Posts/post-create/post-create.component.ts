import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from "@angular/router"
import { Post } from '../post.model';

import { PostsService } from '../posts.servise';


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


  constructor(public postServise: PostsService,public route:ActivatedRoute) { }


  ngOnInit() : void{
    this.route.paramMap.subscribe((paramMap : ParamMap) => {
          if(paramMap.has('postId')){
              this.mode = 'edit';
              this.postId= paramMap.get('postId');
              this.isLoading = true;
              this.postServise.getPost(this.postId).subscribe(postData =>{
                this.isLoading =  false;
                this.post = {id: postData._id,title: postData.title, content :postData.content};
              });
          }else{
            this.mode='create';
            this.postId= null ;
          }
    });
  }
  
  onSavePost(form : NgForm){
    if (form.invalid){
      return
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      this.postServise.addPost(form.value.title, form.value.content);
      
    }else{
      this.postServise.updatePost(this.postId,form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
