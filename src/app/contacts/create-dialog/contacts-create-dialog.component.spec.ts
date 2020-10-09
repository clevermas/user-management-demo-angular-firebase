import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsCreateDialogComponent } from './contacts-create-dialog.component';

describe('ContactsCreateDialogComponent', () => {
  let component: ContactsCreateDialogComponent;
  let fixture: ComponentFixture<ContactsCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
