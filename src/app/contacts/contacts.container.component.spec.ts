import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contacts.ContainerComponent } from './contacts.container.component';

describe('Contacts.ContainerComponent', () => {
  let component: Contacts.ContainerComponent;
  let fixture: ComponentFixture<Contacts.ContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Contacts.ContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Contacts.ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
