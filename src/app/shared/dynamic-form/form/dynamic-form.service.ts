import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DynamicFormControlModel } from '../dynamic-form-control.model';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  handleFilterConfig(filterForm: DynamicFormControlModel[]) {
    for (const i in filterForm) {
      const control = filterForm[i];
      filterForm[i] = {
        ...control,
        fxFlex: control.fxFlex || '48'
      };
    }
    return filterForm;
  }

  composeForm(items: DynamicFormControlModel[]) {
    const filterForm = {};
    for (const i in items) {
      const item = items[i];
      const validators = item.validators || [];
      if (item.type === 'date' && typeof item.value === 'string') {
        item.value = new Date(item.value);
      }
      if (item.required) {
        validators.push(Validators.required);
      }
      filterForm[item.id] = new FormControl(item.value || (item.type === 'date' ? null : ''), validators);
    }
    return filterForm;
  }
}
