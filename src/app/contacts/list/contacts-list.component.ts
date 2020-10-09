import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactModel } from '../../core/contacts/contact.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsListComponent {
  @Input() items: ContactModel[] = [];
  @Input() total: number;
  @Input() loading: boolean;
  @Input() pageIndex: number;
  @Input() pageSize = 10;

  @Output() pageChange = new EventEmitter();


  displayedColumns = [
    'email', 'role', 'birthDate', 'firstName', 'lastName', 'phone'
  ];

  onPageChange(e: PageEvent) {
    this.pageChange.emit(e);
  }

}
