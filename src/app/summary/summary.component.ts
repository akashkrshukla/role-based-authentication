import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/_models';
import { AuthenticationService, PageCount, UserService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.less']
})
export class SummaryComponent implements OnInit {

  loading = false;
  currentUser: User;
  userFromApi: User;
  pageName: any;
  currentPageCount: number;
  constructor
  (
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ){
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
