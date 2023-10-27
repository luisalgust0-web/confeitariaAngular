import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import { AuthenticationService } from '../../private/admin/authentication/service/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private noficationService: MessageService, private authService: AuthenticationService){};


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError( err => {

            const erroMsg = err.message || err.statusText;

                if (err.status == 401) {
                    this.authService.logout();
                    window.setTimeout(()=>{
                        //window.location.replace(environment.urlRedirectNaoAutenticado);
                    }, 3000);
                }

                return next.handle(request);

            return next.handle(request);
        }));
    }

}
