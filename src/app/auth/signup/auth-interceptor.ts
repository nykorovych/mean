import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log( "from interceptor" )
        const authToken = this.authService.getToken();
        console.log(authToken)
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
            
        });
        return next.handle(authRequest)

    }
}