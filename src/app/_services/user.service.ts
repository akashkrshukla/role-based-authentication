import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
export interface PageCount{
    currentUserId: number,
    pageName: string,
    count:number
    
}
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    // Set particular page visit count on the basis of current page
    setNumberOfPageVisits(pageName: string,currentUserId: number,currentPageObj: PageCount,pageObj: PageCount[]){
        if(!pageObj){
            pageObj = [];
        }
        if(currentPageObj){
            currentPageObj.count = currentPageObj.count + 1;
            let index = pageObj.findIndex(x=>x.pageName === pageName);
            pageObj[index] = currentPageObj;
        }else{
            let obj: PageCount = {
                currentUserId : currentUserId,
                pageName: pageName, 
                count: 1
             };   
             pageObj.push(obj);
        } 
        localStorage.setItem('pageObject',JSON.stringify(pageObj));
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }
}