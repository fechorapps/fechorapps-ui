import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiPickListComponent } from './pick-list.component';

describe('UiPickListComponent', () => {
  let fixture: ComponentFixture<UiPickListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiPickListComponent] });
    fixture = TestBed.createComponent(UiPickListComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders source and target items', () => {
    fixture.componentRef.setInput('source', ['Alpha', 'Beta', 'Gamma']);
    fixture.componentRef.setInput('target', ['Delta']);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('shows custom headers', () => {
    fixture.componentRef.setInput('sourceHeader', 'Available');
    fixture.componentRef.setInput('targetHeader', 'Selected');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('moveToTarget moves source selection to target', () => {
    const source = ['Alpha', 'Beta', 'Gamma'];
    fixture.componentRef.setInput('source', source);
    fixture.componentRef.setInput('target', []);
    fixture.detectChanges();
    fixture.componentInstance.sourceSelection.set(['Alpha']);
    fixture.componentInstance.moveToTarget();
    expect(fixture.componentInstance.target()).toContain('Alpha');
    expect(fixture.componentInstance.source()).not.toContain('Alpha');
  });

  it('moveAllToTarget moves all source items to target', () => {
    fixture.componentRef.setInput('source', ['Alpha', 'Beta']);
    fixture.componentRef.setInput('target', []);
    fixture.detectChanges();
    fixture.componentInstance.moveAllToTarget();
    expect(fixture.componentInstance.source().length).toBe(0);
    expect(fixture.componentInstance.target().length).toBe(2);
  });

  it('moveToSource moves target selection back to source', () => {
    fixture.componentRef.setInput('source', []);
    fixture.componentRef.setInput('target', ['Alpha', 'Beta']);
    fixture.detectChanges();
    fixture.componentInstance.targetSelection.set(['Alpha']);
    fixture.componentInstance.moveToSource();
    expect(fixture.componentInstance.source()).toContain('Alpha');
    expect(fixture.componentInstance.target()).not.toContain('Alpha');
  });

  it('disables all actions when disabled is true', () => {
    fixture.componentRef.setInput('source', ['Alpha']);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.canMoveAllToTarget()).toBe(false);
  });
});
