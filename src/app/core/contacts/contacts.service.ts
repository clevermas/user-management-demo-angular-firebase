import { Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { BehaviorSubject } from 'rxjs';
import { ContactModel } from '@core/contacts/contact.model';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  loading$ = new BehaviorSubject(false);

  constructor(private api: ApiService) { }

  create(data: ContactModel) {
    this.loading$.next(true);
    return this.api.post('/contacts', data).pipe(
      finalize(() => this.loading$.next(false))
    );
  }
}
