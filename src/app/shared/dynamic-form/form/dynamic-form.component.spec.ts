import { of } from 'rxjs';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { TestPage } from '@testing/test-page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/shared';
import { AssetFilterService, DateTransformService, SourceFilterService, UsersTimezoneService } from '@app/services';
import { DynamicFormComponent } from './dynamic-form.component';
import { provideMockStore } from '@ngrx/store/testing';
import { userStoreStub } from '@testing/stubs';
import { setUTCDateToLocaleDate } from '@store/helpers';
import { dynamicFormControlAccountConfigStub } from '../control-account/dynamic-filter-form-control-account.component.spec';
import { dynamicFormControlAssetConfigStub } from '../control-asset/dynamic-filter-form-control-asset.component.spec';
import { dynamicFormControlSourceConfigStub } from '../control-source/dynamic-filter-form-control-source.component.spec';
import { dynamicFormControlWalletConfigStub } from '../control-wallet/dynamic-filter-form-control-wallet.component.spec';

@Component({
  template: `<lco-dynamic-filter-form [filterControls]="filterControls"></lco-dynamic-filter-form>`
})
class TestHostComponent {
  @ViewChild(DynamicFormComponent)
  childComponent: DynamicFormComponent;

  filterControls = [
    {
      id: 'id',
      label: 'ID',
      maxLength: 16,
      value: 'id'
    },

    {
      id: 'order_type',
      label: 'Trade Type',
      type: 'select',
      labelType: 'titleCase',
      value: 'order_type',
      options: [
        { value: 'Buy' },
        { value: 'Sell' }
      ]
    },

    dynamicFormControlAssetConfigStub(),

    dynamicFormControlAccountConfigStub(),

    {
      ...dynamicFormControlSourceConfigStub(),
      sources: of({ source: { display_name: 'source' } })
    },

    dynamicFormControlWalletConfigStub(),

    {
      id: 'start_ts',
      label: 'Start Date',
      type: 'dateTime',
      labelType: 'date',
      value: setUTCDateToLocaleDate(moment.utc('09/11/2001 00:00:00').toDate()),
      maxDateControlName: 'start_ts',
      classList: {
        hostElement: 'col-6 d-inline-block p-0',
        datePicker: 'col-7',
        timePicker: 'col-5'
      }
    }

  ];
}

describe('DynamicFormComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let page: TestPage<TestHostComponent>;
  let component: DynamicFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserAnimationsModule
      ],
      declarations: [
        TestHostComponent,
        DynamicFormComponent
      ],
      providers: [
        DateTransformService,
        UsersTimezoneService,
        provideMockStore({ initialState: {
          ...userStoreStub()
        }}),

        {
          provide: AssetFilterService,
          useValue: {
            search() { return of([]); }
          }
        },

        {
          provide: SourceFilterService,
          useValue: {
            search() { return of([]); }
          }
        },

        MessageService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    page = new TestPage<TestHostComponent>(fixture);
    component = page.component.childComponent;
    page.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain ID input control', () => {
    expect(page.query('.mat-form-field input')).toBeTruthy();
    expect(page.query('.mat-form-field').textContent).toBe('ID');
  });

  it('should contain Trade Type select control', () => {
    expect(page.queryAll('.mat-form-field')[1].textContent).toContain('Trade Type');
  });

  it('should contain Account control', () => {
    expect((page.query('lco-dynamic-filter-form-control-account input') as HTMLInputElement).value).toBe('account');
    expect(page.query('lco-dynamic-filter-form-control-account').textContent).toBe('Account');
  });

  it('should contain Asset control', () => {
    expect((page.query('lco-dynamic-filter-form-control-asset input') as HTMLInputElement).value).toBe('asset');
    expect(page.query('lco-dynamic-filter-form-control-asset').textContent).toBe('Asset');
  });

  it('should contain Wallet control', () => {
    expect((page.query('lco-dynamic-filter-form-control-wallet input') as HTMLInputElement).value).toBe('wallet');
    expect(page.query('lco-dynamic-filter-form-control-wallet').textContent).toBe('Wallet');
  });

  it('should contain Source control', async () => {
    expect((page.query('lco-dynamic-filter-form-control-source input') as HTMLInputElement).value).toBe('source');
    expect(page.query('lco-dynamic-filter-form-control-source').textContent).toBe('Source');
  });

  it('should contain Date Time control', () => {
    expect((page.query('lco-dynamic-filter-form-control-date-time input') as HTMLInputElement).value).toBe('9/11/2001');
    expect((page.queryAll('lco-dynamic-filter-form-control-date-time input')[1] as HTMLInputElement).value).toBe('00:00:00');
    expect(page.query('lco-dynamic-filter-form-control-date-time').textContent).toBe('Start Date');
  });

});
