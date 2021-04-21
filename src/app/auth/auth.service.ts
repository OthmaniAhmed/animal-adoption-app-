import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Data, Router } from "@angular/router";
import { loadavg } from "node:os";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";

@Injectable({providedIn: "root"})

export class AuthService{
    private token : string ;
    private authStatusListener = new Subject<boolean>();
    private isAuthenticated = false ;
    private tokenTimer : NodeJS.Timer;
    private userId: string;
    private userName: string;
    constructor(private http: HttpClient, private router: Router){}

getToken(){
    return this.token ;
}
getauthStatusListener(){
    return this.authStatusListener.asObservable();
}
getisAuth(){
        return this.isAuthenticated;
}

createUser(email: string, password: string,name: string,phoneNumber: string,state: string){
     const authData : AuthData = {email: email,password: password,name: name,phoneNumber: phoneNumber,state: state}
    this.http.post("http://localhost:3000/api/user/signup", authData )
    .subscribe(()=>{
        this.router.navigate(['/login']) ;
    });

    
} 
login(email: string, password: string ){
    const authData =  {email , password}
    this.http.post<{token: string, expiresIn : number,userId : string,userName:string}>("http://localhost:3000/api/user/login", authData)
    .subscribe(response =>{
       const token = response.token ; 
       this.token = token ;
       if(token){
       const expiresInduration = response.expiresIn ;
       this.setAuthTimer(expiresInduration);
       this.isAuthenticated = true ;
      
       this.userId = response.userId;
       this.userName= response.userName;
       this.authStatusListener.next(true);
       this.clearAuthData();
       const now = new Date();
       const expiratuinData = new Date( now.getTime() + expiresInduration * 1000);
       this.saveAuthData(token,expiratuinData,this.userId,this.userName)
       this.router.navigate(['/']) ;
       }
    });
}  
logout(){
    this.token = null ;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']) ;
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.userId = null;
}

autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
        return;
    }
    const now = new Date();
    const expriresIn = authInformation.expiratuinData.getTime() - now.getTime() ;
    if(expriresIn > 0 ){
        this.token = authInformation.token;
        this.isAuthenticated = true;
        this.userId = authInformation.userId;
        this.setAuthTimer(expriresIn / 1000);
        this.authStatusListener.next(true);
    }
}

getUserId(){
    return this.userId;
}
getUserName(){
    return this.userName;
}

private saveAuthData(token : string, expiratuinData : Data,userId: string,userName: string){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiratuinData.toISOString());
    localStorage.setItem("userId",userId);
    localStorage.setItem("userName",userName);
}
private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  } 

private getAuthData(){
    const token = localStorage.getItem("token");
    const expiratuinData = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId")
    if(!token || !expiratuinData){
        return;
    }
    return{
        token : token,
        expiratuinData : new Date(expiratuinData),
        userId: userId
    }
}

private setAuthTimer(duration : number){
    this.tokenTimer = setTimeout(()=>{
        this.logout();
    },duration * 1000);

}

}