import { Observable } from 'rxjs';
import { SelectItemModel } from '@core/select-item.model';

export interface DynamicFormControlModel {
  id: string;
  type?: 'input' | 'select' | 'date' | 'hidden' | 'email';
  validators: any[];
  value?: string | SelectItemModel[] | Date;
  classList?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  options?: any[] | Observable<any[]>;
  maxLength?: number | string;
  fxFlex: string;
}
