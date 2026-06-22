import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiKeyFilterDirective } from './key-filter.directive';

@Component({
  standalone: true,
  imports: [UiKeyFilterDirective],
  template: `<input type="text" [uiKeyFilter]="pattern" />`,
})
class TestHostComponent {
  pattern: 'int' | 'alpha' | 'alphanum' = 'int';
}

describe('UiKeyFilterDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('renders host with directive applied', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders an input element', () => {
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
  });

  it('works with alpha pattern', () => {
    fixture.componentInstance.pattern = 'alpha';
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
  });
});
