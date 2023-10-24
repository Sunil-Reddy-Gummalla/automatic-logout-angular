import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticLogoutComponent } from './automatic-logout.component';

describe('AutomaticLogoutComponent', () => {
  let component: AutomaticLogoutComponent;
  let fixture: ComponentFixture<AutomaticLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomaticLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaticLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
