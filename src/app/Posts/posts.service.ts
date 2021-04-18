import { Injectable } from '@angular/core';
import { Subject } from 'rxjs' ;
import { HttpClient } from '@angular/common/http' ;
import { map } from 'rxjs/operators'

import { Post } from './post.model' ;

import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService{
    private posts : Post[]= [];
    private postsUpdated = new Subject<{posts : Post[], postCount : number}>();

    constructor(private http:HttpClient, private router: Router){};

    getPosts(postPerPage : number, currentPage: number){
        const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
        this.http.get<{message : string , posts : any, maxPosts : number}>('http://localhost:3000/api/post'+ queryParams)
        .pipe(map((postData)=>{
            return { 
                posts : postData.posts.map(post =>{
                return {
                    title : post.title,
                    content : post.content,
                    id : post._id,
                    imagePath : post.imagePath,
                    creator : post.creator,
                    creatorName : post.creatorName, 
                    creatorEmail : post.creatorEmail, 
                    creatorState : post.creatorState, 
                    creatorPhone : post.creatorPhone,
                    
                    };

            }), maxPosts : postData.maxPosts
            
            };
        }))
        .subscribe((transformedPostData)=> {
            console.log(transformedPostData)
            this.posts = transformedPostData.posts ;
            this.postsUpdated.next({ posts: [...this.posts], postCount: transformedPostData.maxPosts });
        });
    };


    addPost(content: string,image : File){
        const postData = new FormData();
        
        postData.append("content",content);
        postData.append("image", image )
    this.http
        .post<{message : string, post : Post}>('http://localhost:3000/api/post',postData)
        .subscribe((responseData)=>{
            this.router.navigate(["/pets"]);
            
        });
    } 


    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }; 


    deletePost(postId : string){
       return this.http.delete("http://localhost:3000/api/post/" + postId); 
    };


    getPost(id : string){
        return this.http.get<{_id: string,content : string,imagePath : string,creator : string,
            creatorName : string,
            creatorEmail : string, 
            creatorState : string, 
            creatorPhone : string,
        }>("http://localhost:3000/api/post/" + id) ;
    };

    

    updatePost(id : string, content:string, image: File | string){
      let postData : Post | FormData;
        if(typeof(image) ==='object'){ //object means file 
            postData = new FormData();
            postData.append("id",id);
            postData.append("content", content);
            postData.append("image", image);
       }else{ // i have string as image then i want to send normal json
            postData  = { id: id, content: content, imagePath: image,creator : null ,
                creatorName : null,
                creatorEmail : null, 
                creatorState : null, 
                creatorPhone : null, };

       }
        this.http.put("http://localhost:3000/api/post/" + id , postData  )
        .subscribe(response => {
            this.router.navigate(["/pets"]);
        });
    };
}