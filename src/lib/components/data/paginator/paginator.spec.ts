import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { UiPaginatorComponent } from './paginator.component';

describe('UiPaginatorComponent', () => {
  let fixture: ComponentFixture<UiPaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UiPaginatorComponent,
        TranslocoTestingModule.forRoot({
          langs: { en: { common: { pagination: { rowsPerPage: 'Rows per page' } } } },
          translocoConfig: { defaultLang: 'en', availableLangs: ['en'] },
        }),
      ],
    });
    fixture = TestBed.createComponent(UiPaginatorComponent);
  });

  it('renders', () => {
    fixture.componentRef.setInput('totalRecords', 0);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('computes page count correctly', () => {
    fixture.componentRef.setInput('totalRecords', 100);
    fixture.componentRef.setInput('rows', 10);
    fixture.detectChanges();
    expect(fixture.componentInstance.pageCount()).toBe(10);
  });

  it('starts on first page by default', () => {
    fixture.componentRef.setInput('totalRecords', 100);
    fixture.detectChanges();
    expect(fixture.componentInstance.currentPage()).toBe(0);
    expect(fixture.componentInstance.isFirstPage()).toBe(true);
  });

  it('navigates to next page', () => {
    fixture.componentRef.setInput('totalRecords', 100);
    fixture.componentRef.setInput('rows', 10);
    fixture.detectChanges();
    fixture.componentInstance.goToNextPage();
    expect(fixture.componentInstance.currentPage()).toBe(1);
  });

  it('navigates to last page', () => {
    fixture.componentRef.setInput('totalRecords', 50);
    fixture.componentRef.setInput('rows', 10);
    fixture.detectChanges();
    fixture.componentInstance.goToLastPage();
    expect(fixture.componentInstance.isLastPage()).toBe(true);
  });

  it('disables navigation when disabled is true', () => {
    fixture.componentRef.setInput('totalRecords', 100);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.disabled()).toBe(true);
  });

  it('renders rows per page options when provided', () => {
    fixture.componentRef.setInput('totalRecords', 100);
    fixture.componentRef.setInput('rowsPerPageOptions', [5, 10, 25]);
    fixture.detectChanges();
    expect(fixture.componentInstance.hasRowsPerPageOptions()).toBe(true);
  });
});
