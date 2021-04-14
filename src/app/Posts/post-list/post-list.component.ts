import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
posts : Post[] = [] ;
totalPosts = 0;
postsPerPage = 2;
currentPage = 1;
pageSizeOptions = [1, 2, 5, 20];

userId : string;

private postsSub: Subscription;
private authStatucSub : Subscription;
userIsAuthenticated = false ;
  constructor(public postService : PostsService,private authService : AuthService ) { }
  
  ngOnInit(): void {
  this.postService.getPosts(this.postsPerPage,this.currentPage);
  this.userId = this.authService.getUserId();
  this.postsSub = this.postService.getPostUpdateListener()
    .subscribe((postData: {posts : Post[], postCount : number}) => {
      this.totalPosts = postData.postCount ;
      this.posts = postData.posts;
    });
    this.userIsAuthenticated = this.authService.getisAuth();
    this.authStatucSub= this.authService.getauthStatusListener()
    .subscribe(isAuthticated => {
      this.userId = this.authService.getUserId();
      this.userIsAuthenticated = isAuthticated;
    });
  }



  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authStatucSub.unsubscribe();
  }



  onDelete(postid : string){
    this.postService.deletePost(postid).subscribe(() =>{
      this.postService.getPosts(this.postsPerPage,this.currentPage);
    });
  }



  onChangePage(pageData : PageEvent){
    this.currentPage = pageData.pageIndex + 1 ;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage,this.currentPage)
  
    
  }



}

