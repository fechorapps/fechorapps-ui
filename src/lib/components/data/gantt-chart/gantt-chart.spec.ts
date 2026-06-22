import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiGanttChartComponent, GanttTask } from './gantt-chart.component';

const today = new Date();
const d = (offsetDays: number): Date => {
  const date = new Date(today);
  date.setDate(date.getDate() + offsetDays);
  return date;
};

const testTasks: GanttTask[] = [
  { id: '1', label: 'Task A', start: d(0), end: d(10), color: '#3b82f6' },
  { id: '2', label: 'Task B', start: d(5), end: d(20) },
];

describe('UiGanttChartComponent', () => {
  let fixture: ComponentFixture<UiGanttChartComponent>;
  let component: UiGanttChartComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiGanttChartComponent] });
    fixture = TestBed.createComponent(UiGanttChartComponent);
    component = fixture.componentInstance;
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('computes totalDays correctly', () => {
    fixture.componentRef.setInput('tasks', testTasks);
    fixture.detectChanges();
    expect(component.totalDays()).toBe(20);
  });

  it('getBarStyle returns left, width, and background-color', () => {
    fixture.componentRef.setInput('tasks', testTasks);
    fixture.detectChanges();
    const style = component.getBarStyle(testTasks[0]);
    expect(style['left']).toBeDefined();
    expect(style['width']).toBeDefined();
    expect(style['background-color']).toBe('#3b82f6');
  });

  it('uses default color when task has no color', () => {
    fixture.componentRef.setInput('tasks', testTasks);
    fixture.detectChanges();
    const style = component.getBarStyle(testTasks[1]);
    expect(style['background-color']).toBe('#3b82f6');
  });

  it('shows loading spinner when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('.animate-spin');
    expect(spinner).toBeTruthy();
  });

  it('shows empty state when no tasks', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No tasks');
  });

  it('emits taskClicked when task row is clicked', () => {
    fixture.componentRef.setInput('tasks', testTasks);
    fixture.detectChanges();
    let emitted: GanttTask | undefined;
    component.taskClicked.subscribe(t => (emitted = t));
    const row = fixture.nativeElement.querySelector('tbody tr');
    row.click();
    expect(emitted).toEqual(testTasks[0]);
  });
});
