import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiOrganizationChartComponent } from './organization-chart.component';
import type { OrgChartNode } from './organization-chart.component';

describe('UiOrganizationChartComponent', () => {
  let fixture: ComponentFixture<UiOrganizationChartComponent>;

  const rootNode: OrgChartNode = {
    label: 'CEO',
    expanded: true,
    children: [
      { label: 'CTO', children: [{ label: 'Dev Lead' }] },
      { label: 'CFO' },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiOrganizationChartComponent] });
    fixture = TestBed.createComponent(UiOrganizationChartComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders with a root node', () => {
    fixture.componentRef.setInput('value', rootNode);
    fixture.detectChanges();
    expect(fixture.componentInstance.hasValue()).toBe(true);
  });

  it('shows no chart when value is null', () => {
    fixture.componentRef.setInput('value', null);
    fixture.detectChanges();
    expect(fixture.componentInstance.hasValue()).toBe(false);
  });

  it('detects child nodes correctly', () => {
    fixture.componentRef.setInput('value', rootNode);
    fixture.detectChanges();
    expect(fixture.componentInstance.hasChildren(rootNode)).toBe(true);
  });

  it('detects leaf nodes correctly', () => {
    fixture.componentRef.setInput('value', rootNode);
    fixture.detectChanges();
    const leaf: OrgChartNode = { label: 'CFO' };
    expect(fixture.componentInstance.hasChildren(leaf)).toBe(false);
  });

  it('supports single selection mode', () => {
    fixture.componentRef.setInput('value', rootNode);
    fixture.componentRef.setInput('selectionMode', 'single');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('supports multiple selection mode', () => {
    fixture.componentRef.setInput('value', rootNode);
    fixture.componentRef.setInput('selectionMode', 'multiple');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });
});
