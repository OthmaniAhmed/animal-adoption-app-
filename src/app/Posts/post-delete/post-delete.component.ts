import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css'],
})
export class PostDeleteComponent implements OnInit {
  panelOpenState = false;
constructor(public postService : PostsService){
 
}

  ngOnInit(): void {
    this.refreshPostList();
  }
  table =["1,2,3,4","ahmed","otmani","un chatton très câlin, très joueur, pas du tout agressif, doux et très...  "]
  refreshPostList(){
    this.postService.getAllPostList().subscribe((res)=>{
      this.postService.postsDeletePage = res.posts as Post [];
    })
  }
  onDelete(postid){
    this.postService.deletePostWithAdmin(postid).subscribe(() =>{
      this.refreshPostList();
    });
  }
}
