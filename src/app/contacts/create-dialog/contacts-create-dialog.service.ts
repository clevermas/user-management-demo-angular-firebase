import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ContactsCreateDialogComponent } from '@app/contacts/create-dialog/contacts-create-dialog.component';
import { CONTACTS_ROLES } from '@core/contacts/contacts-roles';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactsCreateDialogService {
  constructor(private dialogService: MatDialog) {
  }

  dialogConfig: MatDialogConfig = {
    width: '480px',
    data: {
      filterForm: [
        {
          id: 'email',
          label: 'Email',
          validators: [Validators.email],
          required: true
        },
        {
          id: 'role',
          label: 'Role',
          type: 'select',
          options: CONTACTS_ROLES,
          required: true
        },
        {
          id: 'password',
          label: 'Password',
          type: 'password',
          required: true
        },
        {
          id: 'phone',
          label: 'Phone',
          required: true
        },
        {
          id: 'firstName',
          label: 'First Name',
          required: true
        },
        {
          id: 'lastName',
          label: 'Last Name',
          required: true
        },
        {
          id: 'birthDate',
          label: 'Birth Date',
          type: 'date',
          required: true
        }
      ]
    }
  };

  open(): MatDialogRef<ContactsCreateDialogComponent, any> {
    return this.dialogService.open(ContactsCreateDialogComponent, this.dialogConfig);
  }
}
