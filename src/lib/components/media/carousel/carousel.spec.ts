import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCarouselComponent } from './carousel.component';

describe('UiCarouselComponent', () => {
  let fixture: ComponentFixture<UiCarouselComponent<string>>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiCarouselComponent] });
    fixture = TestBed.createComponent(UiCarouselComponent<string>);
  });

  it('renders', () => {
    fixture.componentRef.setInput('value', ['A', 'B', 'C']);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('starts on page 0 by default', () => {
    fixture.componentRef.setInput('value', ['A', 'B', 'C', 'D', 'E']);
    fixture.detectChanges();
    expect(fixture.componentInstance.currentPage()).toBe(0);
  });

  it('computes visible items for the current page', () => {
    fixture.componentRef.setInput('value', ['A', 'B', 'C', 'D', 'E']);
    fixture.componentRef.setInput('numVisible', 3);
    fixture.componentRef.setInput('numScroll', 1);
    fixture.detectChanges();
    expect(fixture.componentInstance.visibleItems()).toEqual(['A', 'B', 'C']);
  });

  it('navigates to next page', () => {
    fixture.componentRef.setInput('value', ['A', 'B', 'C', 'D', 'E']);
    fixture.componentRef.setInput('numVisible', 2);
    fixture.componentRef.setInput('numScroll', 2);
    fixture.detectChanges();
    fixture.componentInstance.next();
    expect(fixture.componentInstance.currentPage()).toBe(1);
  });

  it('emits onPage event when page changes', () => {
    fixture.componentRef.setInput('value', ['A', 'B', 'C', 'D']);
    fixture.componentRef.setInput('numVisible', 2);
    fixture.componentRef.setInput('numScroll', 2);
    fixture.detectChanges();

    const spy = jasmine.createSpy('onPage');
    fixture.componentInstance.onPage.subscribe(spy);
    fixture.componentInstance.next();

    expect(spy).toHaveBeenCalledWith({ page: 1 });
  });

  it('applies styleClass to container', () => {
    fixture.componentRef.setInput('value', ['A', 'B']);
    fixture.componentRef.setInput('styleClass', 'my-custom-class');
    fixture.detectChanges();
    expect(fixture.componentInstance.containerClasses()).toContain('my-custom-class');
  });

  it('does not go before page 0 in non-circular mode', () => {
    fixture.componentRef.setInput('value', ['A', 'B', 'C']);
    fixture.componentRef.setInput('circular', false);
    fixture.detectChanges();
    fixture.componentInstance.prev();
    expect(fixture.componentInstance.currentPage()).toBe(0);
  });
});
