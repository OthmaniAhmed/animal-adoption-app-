import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.servise';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
posts : Post[] = [] ;
private postsSub: Subscription;

  constructor(public postService : PostsService) { }
  
  ngOnInit(): void {
  this.postService.getPosts();
  this.postsSub = this.postService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
  onDelete(postid : string){
    this.postService.deletePost(postid);
  }



}

