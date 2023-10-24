import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { AutoLogoutService } from '../auto-logout.service';

@Component({
  selector: 'app-timer-input',
  templateUrl: './timer-input.component.html',
  styleUrls: ['./timer-input.component.scss']
})
export class TimerInputComponent implements OnInit {
  timeInSeconds: number;
  timer: Observable<number>;
  timerSubscription: Subscription;
  countdown: number;

  constructor(private autoLogoutService: AutoLogoutService) {}

  ngOnInit(): void {
    this.autoLogoutService.storedTimeToLogout$.subscribe((value) => {
      this.countdown = value / 1000;
      this.startCountdown(value); // Start or restart the countdown when the time changes
    });
  }

  startTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.autoLogoutService.startLogoutCountDown(this.timeInSeconds * 1000);
    this.startCountdown(this.timeInSeconds * 1000); // Start or restart the countdown
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
}
