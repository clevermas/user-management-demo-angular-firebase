import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contacts-filter',
  templateUrl: './contacts-filter.component.html',
  styleUrls: ['./contacts-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsFilterComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;

  destroyed$ = new Subject();

  @Input() roles = [];
  @Output() filterChange = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  clearRole(e) {
    this.filterForm.get('role').reset();
    e.stopPropagation();
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      role: '',
      birthDate: ''
    });

    this.filterForm.valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe(filterForm => this.filterChange.emit(filterForm));
  }

  ngOnDestroy() {
    this.destroyed$.next(1);
    this.destroyed$.complete();
  }

}
