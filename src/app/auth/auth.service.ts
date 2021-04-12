import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";

@Injectable({providedIn: "root"})

export class AuthService{
    private token : string ;

    constructor(private http: HttpClient){}

getToken(){
    return this.token ;
}

 createUser(email: string, password: string,name: string,phoneNumber: string,state: string){
     const authData : AuthData = {email: email,password: password,name: name,phoneNumber: phoneNumber,state: state}
    this.http.post("http://localhost:3000/api/user/signup", authData )
    .subscribe(response =>{
        console.log(response);
    });
} 
login(email: string, password: string ){
    const authData =  {email , password}
    this.http.post<{token: string}>("http://localhost:3000/api/user/login", authData)
    .subscribe(response =>{
       const token = response.token ; 
       this.token = token ;

    })
}  

}