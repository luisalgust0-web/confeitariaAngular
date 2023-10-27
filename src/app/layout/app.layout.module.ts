import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from "./app.layout.component";

import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { MessagesModule } from 'primeng/messages';


@NgModule({
    declarations: [
        AppLayoutComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SidebarModule,
        BadgeModule,
        MessagesModule,
        RippleModule,
        RouterModule,
        OverlayPanelModule,
        BreadcrumbModule,
        MenubarModule,
        ToastModule,
        ProgressSpinnerModule
        
    ],providers:[
        MessageService
    ]
    ,
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
