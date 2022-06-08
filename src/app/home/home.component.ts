import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService, PageCount } from '@app/_services';
import { ActivatedRoute } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;
    pageName: any;
    pageCount: number;
    currentPageCount: number;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.route.data.subscribe(v => {
            this.pageName = v.pageName;
        });
        let pageObj: PageCount[] = JSON.parse(localStorage.getItem('pageObject'));
        let currentPageObj = pageObj? pageObj.find(x=>x.currentUserId === this.currentUser.id && x.pageName === this.pageName) : null;
        this.currentPageCount = currentPageObj ? currentPageObj.count + 1 : 1;
        this.userService.setNumberOfPageVisits(this.pageName, this.currentUser.id,currentPageObj,pageObj);
        this.loading = true;
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    }
}