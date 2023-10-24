import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { LogoutService } from './logout.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

logoutCountdown!: Subscription;
private storedTimeToLogoutSubject = new BehaviorSubject<number>(30000);

get storedTimeToLogout$(): Observable<number> {
  return this.storedTimeToLogoutSubject.asObservable();
}

constructor(private logoutService: LogoutService, private dialog: MatDialog) { 
  this.startLogoutCountDown(this.storedTimeToLogoutSubject.value);
}

startLogoutCountDown(timeToLogout: number = this.storedTimeToLogoutSubject.value) {
  this.storedTimeToLogoutSubject.next(timeToLogout);
  if(this.logoutCountdown) {
    this.cancelLogout();
  }
  this.logoutCountdown = this.createCountdown(timeToLogout).subscribe(() => {
      this.openConfirmationDialog().subscribe((result) => {
        if (result) {
          this.startLogoutCountDown(timeToLogout);
        } else {
          // User chose to log out
          this.logoutCountdown.unsubscribe();
          this.ourLogoutFunction();
        }
      });
  });
}

createCountdown(timeToLogout: number): Observable<number> {
  return timer(timeToLogout);
}

cancelLogout() {
  this.logoutCountdown.unsubscribe();
}

ourLogoutFunction() {
  this.logoutService.logout();
}

openConfirmationDialog() {
  return this.dialog.open(ConfirmationDialogComponent, {
    width: '400px',
    disableClose: true
  }).afterClosed();
}
}