import { ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { filter, map, Subject, Subscription } from 'rxjs';
import { LayoutService } from "./service/app.layout.service";
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../modules/private/admin/authentication/service/authentication.service';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '../modules/shared/loading-service';
import { MenuService } from './app.menu.service';
import { LoginComponent } from '../modules/private/admin/authentication/components/login/login.component';

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnDestroy, OnInit {

    items!: MenuItem[];
    loading: Subject<boolean> = this.loadingService.isLoading;
    isLoading: boolean = false

    overlayMenuOpenSubscription: Subscription | undefined;

    menuOutsideClickListener: any;

    profileMenuOutsideClickListener: any;

    menuItems: MenuItem[] = [];
    menus: MenuItem[] = [];

    home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

    observableBreadCrumb?: Subscription;

    constructor(public layoutService: LayoutService,
        private renderer: Renderer2,
        private router: Router,
        private loadingService: LoadingService,
        private titleService: Title,
        private activatedRoute: ActivatedRoute,
        private changeDetector:ChangeDetectorRef,
        private menuService: MenuService) {

    }

    ngOnInit(): void {

        this.items = [
            {
                label: 'File',
                items: [{
                        label: 'New', 
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {label: 'Project'},
                            {label: 'Other'},
                        ]
                    },
                    {label: 'Open'},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                    {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
                ]
            }
        ];

        
        this.observableBreadCrumb = this.menuService.breadcrumbObservable.subscribe(data => {
            this.menuItems = data;
        });

        this.loading.subscribe(resp=>{
            this.isLoading = resp;
            this.changeDetector.detectChanges();
        });

        const appTitle = this.titleService.getTitle();

        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                });
            }


            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

       
        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((evt:any) => {
            this.hideMenu();
            this.hideProfileMenu();
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd),
            map(() => {
                const child = this.activatedRoute.firstChild;

                if(!child) return;
                
                if (child.snapshot.data['title']) {
                    return child.snapshot.data['title'];
                }
                return appTitle;
            })
        ).subscribe((evt: any) => {
            this.hideMenu();
            this.hideProfileMenu();
        });
        
    }

    searchTree(element: any, link: any): any {

        if (element.link == link) {
            return element;
        } else if (element.filhos && element.filhos.length > 0) {
            var i;
            var result = null;

            for (i = 0; result == null && i < element.filhos.length; i++) {
                result = this.searchTree(element.filhos[i], link);
            }

            return result;
        }

        return null;
    }

    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    hideProfileMenu() {
        this.layoutService.state.profileSidebarVisible = false;
        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config.colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
            'layout-overlay': this.layoutService.config.menuMode === 'overlay',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-slim': this.layoutService.config.menuMode === 'slim',
            'layout-horizontal': this.layoutService.config.menuMode === 'horizontal',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config.ripple
        }
    }

    login(){
        this.router.navigate(["/login"])
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }

        this.observableBreadCrumb?.unsubscribe();
    }
}
