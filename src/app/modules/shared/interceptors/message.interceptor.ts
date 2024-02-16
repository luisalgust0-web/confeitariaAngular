import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { defer, Observable, tap } from 'rxjs';
import { JsonMessageCode } from '../models/MessageResult';
import {MessageService} from 'primeng/api';

@Injectable()
export class MessageInterceptor implements HttpInterceptor {

  constructor(private msgService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((evt:any) => {
        if (evt instanceof HttpResponse) {
          if(evt.body && evt.body._message){
              if(evt.body._severity == JsonMessageCode.Error) this.msgService.add({severity:'error', summary: 'Erro', detail: evt.body._message});
              else if(evt.body.codeResponse == JsonMessageCode.Success) this.msgService.add({severity:'success', detail: evt.body._message});
              else if(evt.body._severity == JsonMessageCode.UnknowError) this.msgService.add({severity:'warn', summary: 'Erro', detail: evt.body._message});
              else this.msgService.add({severity:'info', summary: 'Erro', detail: evt.body._message});
          }
        }
      })
    );
  }
}
