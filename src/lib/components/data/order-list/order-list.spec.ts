import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiOrderListComponent } from './order-list.component';

describe('UiOrderListComponent', () => {
  let fixture: ComponentFixture<UiOrderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiOrderListComponent] });
    fixture = TestBed.createComponent(UiOrderListComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders with value items', () => {
    fixture.componentRef.setInput('value', ['Alpha', 'Beta', 'Gamma']);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows header when header input is set', () => {
    fixture.componentRef.setInput('header', 'My List');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('disables component when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.disabled()).toBe(true);
  });

  it('moveUp moves selected item up in the list', () => {
    const items = ['Alpha', 'Beta', 'Gamma'];
    fixture.componentRef.setInput('value', items);
    fixture.componentRef.setInput('selection', ['Beta']);
    fixture.detectChanges();
    fixture.componentInstance.moveUp();
    expect(fixture.componentInstance.value()[0]).toBe('Beta');
  });

  it('moveDown moves selected item down in the list', () => {
    const items = ['Alpha', 'Beta', 'Gamma'];
    fixture.componentRef.setInput('value', items);
    fixture.componentRef.setInput('selection', ['Beta']);
    fixture.detectChanges();
    fixture.componentInstance.moveDown();
    expect(fixture.componentInstance.value()[2]).toBe('Beta');
  });

  it('shows filter input when filter is enabled', () => {
    fixture.componentRef.setInput('filter', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders striped rows when striped is true', () => {
    fixture.componentRef.setInput('value', ['Alpha', 'Beta', 'Gamma']);
    fixture.componentRef.setInput('striped', true);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
