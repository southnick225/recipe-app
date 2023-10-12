import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";


export interface AuthResponseData{
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    loaclId: string,
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService{

    constructor(private http: HttpClient){}

    signUp(email: string, password: string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKOKsGETEqkEVNJbyWbi7gpSq8vc3uF1o', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError))
    }

    login(email: string, password: string){
       return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKOKsGETEqkEVNJbyWbi7gpSq8vc3uF1o', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError))
    }

    private handleError(errorRes: HttpErrorResponse){
        console.log(errorRes);
        let errorMessage = 'An unknown error occured.';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS': 
                errorMessage = 'This email already exists'
                break
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.'
                break
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'Invalid login credentials.'
        }
        return throwError(errorMessage);
    }

}