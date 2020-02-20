import {Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { navItems } from '../../_nav';
import { AuthenticationService } from '../../_services/AuthenticationService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) { 
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/home/dashboard']);
    }
}
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
