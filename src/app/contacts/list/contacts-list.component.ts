import { Component, Input } from '@angular/core';
import { ContactModel } from '../../core/contacts/contact.model';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent {
  @Input() items: ContactModel[];

  displayedColumns = [
    'email', 'role', 'birthDate', 'firstName', 'lastName', 'phone'
  ];

}
