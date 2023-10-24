import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, interval } from 'rxjs';
import { takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  count: number = 30;
  private destroyed$ = new Subject<void>();
  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>, private changeDetection: ChangeDetectorRef) {}

  ngOnInit() {
    interval(1000)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(() => {
      if (this.count === 1) {
        this.logout();
        this.destroyed$.next();
      }

      this.count--;

      this.changeDetection.detectChanges();
    });
  }

  stay() {
    this.dialogRef.close(true);
  }

  logout() {
    this.dialogRef.close(false);
  }
}
