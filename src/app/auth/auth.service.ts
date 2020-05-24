import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthData} from "./auth-data.model"
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})

export class AuthService {

    private isAuthenticated = false;
    private token: string;
    private tokenTimer:any;
    private authStatusListener = new Subject<boolean>();
    
    constructor(private http: HttpClient, private router: Router) {}

    getToken() {
        return this.token;
    }
    getIsAuth() {
        return this.isAuthenticated
    }

    getauthStatusListener(){
        return this.authStatusListener.asObservable()
    }

    createUser(email:string, password: string){
    const authdata: AuthData = {email:email, password:password};

    

    this.http.post<any>('http://localhost:3000/api/user/signup', authdata )
        .subscribe(response => {
       
        })
    }
    login (email:string, password: string) {
        const authData = {email:email, password: password};
        this.http.post<{token: string, expiresIn:number}>('http://localhost:3000/api/user/login', authData)
            .subscribe(response => {
                 const token = response.token
               this.token = token;
               if (token) {
                const expiresInDuretion = response.expiresIn;
                this.setAuthTimer(expiresInDuretion);
                this.isAuthenticated = true
                this.authStatusListener.next(true)
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuretion * 10000)
                this.saveAuthData(token, expirationDate);
                this.router.navigate(['/'])
               }
            })
    }
    autoAuthUser(){
        const authInformation = this.getAuthDate();

        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn >= 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }
    
    logout(){
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.clearAuthData()
        this.router.navigate(['/'])
        clearTimeout(this.tokenTimer)
    }
    private setAuthTimer(duration: number){
        this.tokenTimer = setTimeout(() => { this.logout()}, duration *1000 );
    }
    saveAuthData( token: string, expirationDate: Date){
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString() )
    }
    clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration')
    }
    getAuthDate(){
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        if (!token || !expirationDate) {
            return
        }
        return { token: token, expirationDate: new Date(expirationDate)}

    }

}