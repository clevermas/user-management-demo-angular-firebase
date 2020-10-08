import { Component, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PaginationService } from '../core/pagination/pagination.service';
import { CONTACTS_COLLECTION } from '../core/contacts/contacts.collection';

@Component({
  selector: 'app-contacts.container',
  templateUrl: './contacts.container.component.html',
  styleUrls: ['./contacts.container.component.scss'],
  providers: [PaginationService]
})
export class ContactsContainerComponent implements OnDestroy {
  roles = [{label: 'Admin', value: 'admin'}, {label: 'User', value: 'user'}];

  filteringState = {role: '', birthDate: null};

  pagination$ = new BehaviorSubject(0);
  filtering$ = new BehaviorSubject('');

  contacts$ = combineLatest([this.pagination$, this.filtering$, this.pagination.emergency$]).pipe(
    switchMap(([pagination, _]) => this.pagination.data(pagination)));

  filteringHook = (query) => {
    const {role, birthDate} = this.filteringState;
    if (role) {
      query = query.where('role', '==', role);
    }
    if (birthDate) {
      query = query.where('birthDate', '==', new Date(birthDate).getTime());
    }

    return query;
  }

  constructor(public pagination: PaginationService) {
    pagination.firestoreCollection = CONTACTS_COLLECTION;
    pagination.idField = 'id';
    pagination.orderBy = 'email';
    pagination.dataQueryHooks.push(this.filteringHook);
  }

  onPageChange(e: PageEvent) {
    this.pagination$.next(e.pageIndex);
  }

  onFilterChange(filters) {
    this.filteringState = filters;
    this.pagination.clear();
    this.filtering$.next('');
  }

  ngOnDestroy(): void {
    this.pagination.destroyed$.next('');
    this.pagination.destroyed$.complete();
  }

}
