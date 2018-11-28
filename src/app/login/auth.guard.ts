import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService} from './login.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate{
  adminList: any;
  adminSubscription: Subscription;
  constructor(private authService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    if(next.routeConfig['path'] == 'history'){
      return this.canActivateAsAdmin(next, state);
    }

    else {
      return this.authService.user.pipe(
        take(1),
        map((user) => !!user),
        tap((loggedIn) => {
          if (!loggedIn) {
            console.log('access denied');
            this.router.navigate(['/login']);
          }
        }),
      );
    }
  }

  canActivateAsAdmin(next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.user.pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn) => {
        if (!loggedIn){
          console.log('access denied');
          this.router.navigate(['/login']);
        }
        else {
          this.authService.getAdmins().subscribe((admins: any) => {
            for(var i = 0; i < admins.length; i++){
                if(this.authService.userUid == admins[i].key){
                  if(admins[i].data == true){
                    console.log("User is an admin");
                    return;
                  }}}
            console.log('Must be an admin to access');
            this.router.navigate(['/']);
          });
        }
      }),
    );
  }
}
