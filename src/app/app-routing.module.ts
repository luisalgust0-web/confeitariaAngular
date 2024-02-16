import { RouterModule } from '@angular/router';
import {  NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { RooteGuard } from './roote.guard';
import { LoginComponent } from 'src/app/modules/shared/authentication/components/login/login.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    {
                        path: '', loadChildren: () => { return import('./modules/private/private.module').then(m => m.PrivateModule)} , canActivate: [RooteGuard]
                    }
                    ,{path: 'login', component: LoginComponent}
                ],
            },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
