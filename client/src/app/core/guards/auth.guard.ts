import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isAuthenticated().pipe(
      map((response: any) => {
        if (response.authenticated) {
          return true; // User is authenticated
        } else {
          this.router.navigate(["/login"]); // Redirect to login if not authenticated
          return false;
        }
      }),
      catchError((error) => {
        console.error("Error checking authentication status:", error);
        this.router.navigate(["/login"]);
        return of(false);
      })
    );
  }
}