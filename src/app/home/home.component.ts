import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../logout.service';
import { AutoLogoutService } from '../auto-logout.service';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  countdown: number;
  timer: Observable<number>;
  timerSubscription: Subscription;
  //As Home component Loads After Login I am using autoLogoutService intilize here and starts the auto-logout feature
  constructor(private logoutService: LogoutService, private autoLogoutService: AutoLogoutService) { }

  ngOnInit(): void {
    this.autoLogoutService.storedTimeToLogout$.subscribe((value) => {
      this.countdown = value / 1000;
      this.startCountdown(value); // Start or restart the countdown when the time changes
    });
  }
  private startCountdown(initialValue: number) {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timer = interval(1000);
    this.countdown = initialValue / 1000;
    this.timerSubscription = this.timer.subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.timerSubscription.unsubscribe();
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    this.autoLogoutService.startLogoutCountDown();
  }

  logout() {
    this.autoLogoutService.logoutCountdown.unsubscribe();
    this.logoutService.logout();
  }
  

}
