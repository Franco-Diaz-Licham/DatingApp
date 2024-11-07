import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterseptor implements HttpInterceptor {

    constructor(private router: Router, private toaster: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var output = next.handle(req).pipe(
            catchError((error) => {
                if (error) {
                    switch (error.status) {
                        case 400:
                            if (error.error.errors) {
                                const modelStateErrors = [];
                                for (const key in error.error.errors) {
                                    if (error.error.errors[key]) {
                                        modelStateErrors.push(error.error.errors[key])
                                    }
                                }
                                throw modelStateErrors.flat();
                            }
                            else {
                                this.toaster.error('Not a good request', error.status);
                            }
                            break;
                        case 401:
                            this.toaster.error('Unauthorized', error.status);
                            break;
                        case 404:
                            this.router.navigateByUrl('/not-found')
                            break;
                        case 500:
                            const navExtras: NavigationExtras = {
                                state: {error: error.error}
                            }
                            this.router.navigateByUrl('/server-error', navExtras)
                            break;
                        default:
                            this.toaster.error('Something went wrong');
                            console.log(error);
                            break;
                    }
                }

                return throwError(error);
            })
        );
        return output;
    }

}

