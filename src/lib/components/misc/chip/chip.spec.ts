import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiChipComponent } from './chip.component';

describe('UiChipComponent', () => {
  let fixture: ComponentFixture<UiChipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiChipComponent] });
    fixture = TestBed.createComponent(UiChipComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('displays the label text', () => {
    fixture.componentRef.setInput('label', 'Angular');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Angular');
  });

  it('applies chip base classes', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.chipClasses()).toContain('inline-flex');
    expect(fixture.componentInstance.chipClasses()).toContain('rounded-full');
  });

  it('applies styleClass to chip', () => {
    fixture.componentRef.setInput('styleClass', 'border border-blue-500');
    fixture.detectChanges();
    expect(fixture.componentInstance.chipClasses()).toContain('border-blue-500');
  });

  it('emits onRemove when remove button is clicked', () => {
    fixture.componentRef.setInput('label', 'Tag');
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    const spy = jasmine.createSpy('onRemove');
    fixture.componentInstance.onRemove.subscribe(spy);

    const removeBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    removeBtn?.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not show remove button when removable is false', () => {
    fixture.componentRef.setInput('label', 'Tag');
    fixture.componentRef.setInput('removable', false);
    fixture.detectChanges();
    const removeBtn = fixture.nativeElement.querySelector('button');
    expect(removeBtn).toBeNull();
  });
});
