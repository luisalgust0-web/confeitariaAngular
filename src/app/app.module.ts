import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, HashLocationStrategy, LocationStrategy, registerLocaleData  } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './modules/shared/interceptors/http-error-interceptor';
import { MessageInterceptor } from './modules/shared/interceptors/message.interceptor';
import { LoadingInterceptor } from './modules/shared/interceptors/loading.interceptor';
import localePT from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicAuthenticationInterceptor } from './modules/shared/interceptors/basic-authentication.interceptor';

registerLocaleData(localePT);

@NgModule({
    declarations: [
        AppComponent,
        
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        AppLayoutModule, 
        RouterModule,
        FormsModule, 
        ReactiveFormsModule,
    ],
    providers: [
      DatePipe,
      DecimalPipe,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MessageInterceptor,
            multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: BasicAuthenticationInterceptor,
          multi: true,
       },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
         },
         { provide: LOCALE_ID, useValue: 'pt-br' },

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
