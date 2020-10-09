import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicFormComponent } from '@shared/dynamic-form/form/dynamic-form.component';
import { ContactsCreateDialogDataModel } from './contacts-create-dialog-data.model';
import { ContactsService } from '@core/contacts/contacts.service';
import { ContactModel } from '@core/contacts/contact.model';

@Component({
  selector: 'app-contacts-create-dialog',
  templateUrl: './contacts-create-dialog.component.html',
  styleUrls: ['./contacts-create-dialog.component.scss']
})
export class ContactsCreateDialogComponent {
  layout = {
    layout: 'row wrap',
    align: 'space-between center'
  };
  error;
  loading$ = this.contactsService.loading$;

  constructor(public dialogRef: MatDialogRef<ContactsCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ContactsCreateDialogDataModel,
              public contactsService: ContactsService) {
  }

  @ViewChild(DynamicFormComponent) form;

  clear() {
    this.form.dynamicForm.reset();
  }

  close() {
    this.dialogRef.close();
  }

  async create() {
    const data: ContactModel = {...this.form.dynamicForm.value};
    data.birthDate = (data.birthDate as Date).getTime();

    this.error = '';
    try {
      await this.contactsService.create(data).toPromise();
    } catch (e) {
      this.error = e.error.message;
      return;
    }
    this.dialogRef.close();
  }

}
