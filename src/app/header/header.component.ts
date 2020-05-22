import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authlistenerSubs: Subscription


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authlistenerSubs = this.authService.getauthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    })
  }
  ngOnDestroy() {
    this.authlistenerSubs.unsubscribe()
  }
  onLogOut(){
    this.authService.logout()
  }
}
