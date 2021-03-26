import { Injectable } from '@angular/core';
import { Subject } from 'rxjs' ;
import { HttpClient } from '@angular/common/http' ;
import { map } from 'rxjs/operators'

import { Post } from './post.model' ;
import { PortalHostDirective } from '@angular/cdk/portal';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService{
    private posts : Post[]= [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http:HttpClient, private router: Router){};

    getPosts(){
        this.http
        .get<{message : string , posts : any}>('http://localhost:3000/api/post')
        .pipe(map((postData)=>{
            return postData.posts.map(post =>{
                return {
                    title : post.title,
                    content : post.content,
                    id : post._id

                };
            });
        }))
        .subscribe((transformedPostpost)=> {
            this.posts = transformedPostpost ;
            this.postsUpdated.next([...this.posts]);
        });
        
        ;

    }
    addPost(title: string ,content: string){
        const post: Post = {id : null,title : title, content : content };
    this.http
        .post<{message : string, postId : string}>('http://localhost:3000/api/post',post)
        .subscribe((responseData)=>{
           const id = responseData.postId;
            post.id = id ;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(["/pets"]);
            
        });
    } 
    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    } 

    deletePost(postId : string){
        this.http.delete("http://localhost:3000/api/post/" + postId).subscribe(() =>{
         const updatedPost = this.posts.filter(post => post.id !== postId );
         this.posts = updatedPost;
         this.postsUpdated.next([...this.posts]);

        });
    };
    getPost(id : string){
        return this.http.get<{_id: string, title: string,content : string}>("http://localhost:3000/api/post/" + id) ;
    };

    updatePost(id : string, title: string, content:string){
        const post : Post = { id: id, title: title, content:content};
        this.http.put("http://localhost:3000/api/post/" + id , post )
        .subscribe(response => {
            const updatedPosts = [...this.posts];
            const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
            updatedPosts[oldPostIndex] = post ;
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts])
            this.router.navigate(["/pets"]);
        });
    }
}