import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicFormControlModel } from '../dynamic-form-control.model';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent {
  @Input('controls') set _filterControls(items: DynamicFormControlModel[]) {
    this.controls = this.dynamicFormService.handleFilterConfig(items);
    this.dynamicForm = new FormGroup(this.dynamicFormService.composeForm(items));
  }

  @Input() layout: { layout: string, align: string }

  controls: DynamicFormControlModel[];
  dynamicForm: FormGroup;

  constructor(private dynamicFormService: DynamicFormService) {
  }

  trackByFn = (i: number, item: DynamicFormControlModel) => item.id;

}
